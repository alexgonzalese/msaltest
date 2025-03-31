import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { Observable, from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { loginRequest } from '../msal-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private msalService: MsalService) {}

  /**
   * Iniciar sesión usando redirección
   */
  loginRedirect(): void {
    this.msalService.loginRedirect(loginRequest as RedirectRequest);
  }

  /**
   * Iniciar sesión usando popup
   */
  loginPopup(): Observable<AuthenticationResult> {
    return from(this.msalService.loginPopup(loginRequest as PopupRequest));
  }

  /**
   * Cerrar sesión
   */
  logout(): void {
    this.msalService.logout();
  }

  /**
   * Verificar si el usuario está autenticado
   */
  isLoggedIn(): boolean {
    return this.msalService.instance.getAllAccounts().length > 0;
  }

  /**
   * Obtener la cuenta activa
   */
  getAccount() {
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length === 0) {
      return null;
    }
    return accounts[0];
  }

  /**
   * Obtener token de acceso para los scopes especificados
   */
  getAccessToken(scopes: string[]): Observable<string> {
    const account = this.getAccount();
    
    if (!account) {
      return of('');
    }

    const request = {
      scopes: scopes,
      account: account
    };

    return from(this.msalService.acquireTokenSilent(request)).pipe(
      map((result: AuthenticationResult) => {
        return result.accessToken;
      }),
      catchError(error => {
        console.error('Error acquiring token silently:', error);
        // Si falla, intentamos adquirir el token de forma interactiva
        return from(this.msalService.acquireTokenPopup(request)).pipe(
          map((result: AuthenticationResult) => {
            return result.accessToken;
          })
        );
      })
    );
  }

  /**
   * Obtener nombre del usuario autenticado
   */
  getUserName(): string {
    const account = this.getAccount();
    if (account) {
      return account.name || account.username || 'Usuario';
    }
    return 'Usuario desconocido';
  }
} 