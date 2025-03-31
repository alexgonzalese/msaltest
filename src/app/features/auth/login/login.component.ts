import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Bienvenido</h2>
        <p>Inicie sesión con su cuenta de Microsoft:</p>
        <div class="buttons">
          <button (click)="login()" class="login-button">
            Iniciar sesión
          </button>
          <button (click)="loginPopup()" class="login-button popup">
            Iniciar sesión con popup
          </button>
        </div>
        <div *ngIf="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f5f5f5;
    }
    .login-card {
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      background-color: white;
      text-align: center;
      max-width: 400px;
      width: 100%;
    }
    h2 {
      color: #0078d4;
      margin-bottom: 1rem;
    }
    .buttons {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 2rem;
    }
    .login-button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      background-color: #0078d4;
      color: white;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .login-button:hover {
      background-color: #005a9e;
    }
    .login-button.popup {
      background-color: #7b68ee;
    }
    .login-button.popup:hover {
      background-color: #6a5acd;
    }
    .error-message {
      color: #d13438;
      margin-top: 1rem;
    }
  `]
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  returnUrl: string = '/';
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Verificar si ya está autenticado
    if (this.authService.isLoggedIn()) {
      this.navigateToReturnUrl();
    }
    
    // Obtener la URL de retorno desde los parámetros de consulta
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    try {
      this.authService.loginRedirect();
    } catch (error) {
      this.errorMessage = 'Error al iniciar sesión. Por favor, inténtelo de nuevo.';
      console.error('Error de inicio de sesión:', error);
    }
  }

  loginPopup() {
    this.authService.loginPopup().subscribe({
      next: (result) => {
        console.log('Login exitoso:', result);
        this.navigateToReturnUrl();
      },
      error: (error) => {
        this.errorMessage = 'Error al iniciar sesión con popup. Por favor, inténtelo de nuevo.';
        console.error('Error de inicio de sesión con popup:', error);
      }
    });
  }

  private navigateToReturnUrl() {
    this.router.navigateByUrl(this.returnUrl);
  }
} 