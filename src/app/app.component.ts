import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/auth/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angular-standalone-project';

  constructor(
    private msalService: MsalService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    // MSAL puede manejar automáticamente el procesamiento de la respuesta de autenticación
    this.msalService.instance.handleRedirectPromise().then(
      (response) => {
        if (response) {
          console.log('Autenticación exitosa:', response);
        }
      },
      (error) => {
        console.error('Error al manejar redirección de autenticación:', error);
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}
