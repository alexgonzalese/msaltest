import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { UserProfile } from '../../core/auth/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  template: `
    <div class="profile-container">
      <div class="profile-card">
        <h2>Perfil de Usuario</h2>
        
        <div *ngIf="profile" class="profile-info">
          <div class="profile-header">
            <div class="avatar">
              {{ getInitials() }}
            </div>
            <div class="user-name">
              <h3>{{ profile.displayName }}</h3>
              <p>{{ profile.mail || profile.userPrincipalName }}</p>
            </div>
          </div>
          
          <div class="profile-details">
            <div class="detail-item" *ngIf="profile.jobTitle">
              <span class="label">Puesto:</span>
              <span>{{ profile.jobTitle }}</span>
            </div>
            <div class="detail-item" *ngIf="profile.officeLocation">
              <span class="label">Ubicación:</span>
              <span>{{ profile.officeLocation }}</span>
            </div>
            <div class="detail-item" *ngIf="profile.mobilePhone">
              <span class="label">Teléfono:</span>
              <span>{{ profile.mobilePhone }}</span>
            </div>
          </div>
        </div>

        <div *ngIf="!profile && !error" class="loading">
          Cargando información de perfil...
        </div>

        <div *ngIf="error" class="error-message">
          {{ error }}
        </div>

        <div class="actions">
          <button (click)="logout()" class="logout-button">Cerrar sesión</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      display: flex;
      justify-content: center;
      padding: 2rem;
      background-color: #f5f5f5;
      min-height: 100vh;
    }
    .profile-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      padding: 2rem;
      width: 100%;
      max-width: 600px;
    }
    h2 {
      color: #0078d4;
      margin-bottom: 1.5rem;
      text-align: center;
    }
    .profile-header {
      display: flex;
      align-items: center;
      margin-bottom: 2rem;
    }
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: #0078d4;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: bold;
      margin-right: 1.5rem;
    }
    .user-name h3 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }
    .user-name p {
      margin: 0;
      color: #666;
    }
    .profile-details {
      margin-bottom: 2rem;
    }
    .detail-item {
      padding: 0.75rem 0;
      border-bottom: 1px solid #eee;
      display: flex;
    }
    .detail-item:last-child {
      border-bottom: none;
    }
    .label {
      font-weight: bold;
      width: 120px;
      color: #555;
    }
    .actions {
      display: flex;
      justify-content: center;
      margin-top: 1.5rem;
    }
    .logout-button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      background-color: #d13438;
      color: white;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .logout-button:hover {
      background-color: #a4262c;
    }
    .loading {
      text-align: center;
      padding: 2rem;
      color: #666;
    }
    .error-message {
      color: #d13438;
      background-color: #fde7e9;
      padding: 1rem;
      border-radius: 4px;
      text-align: center;
      margin: 1rem 0;
    }
  `]
})
export class ProfileComponent implements OnInit {
  profile: UserProfile | null = null;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    // Primero verificamos si el usuario está autenticado
    if (!this.authService.isLoggedIn()) {
      this.error = 'Usuario no autenticado';
      return;
    }

    // Obtenemos el token para acceder a Microsoft Graph
    this.authService.getAccessToken(['User.Read']).subscribe({
      next: (token) => {
        if (!token) {
          this.error = 'No se pudo obtener el token de acceso';
          return;
        }

        // Llamamos a Microsoft Graph API para obtener el perfil
        this.http.get<UserProfile>('https://graph.microsoft.com/v1.0/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        }).pipe(
          catchError(error => {
            console.error('Error al obtener perfil de usuario:', error);
            this.error = 'No se pudo cargar la información del perfil';
            return of(null);
          })
        ).subscribe(data => {
          if (data) {
            this.profile = data;
          }
        });
      },
      error: (error) => {
        console.error('Error al obtener token:', error);
        this.error = 'Error al autenticar con Microsoft Graph';
      }
    });
  }

  getInitials(): string {
    if (!this.profile || !this.profile.displayName) {
      return '?';
    }
    
    const names = this.profile.displayName.split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  }

  logout() {
    this.authService.logout();
  }
} 