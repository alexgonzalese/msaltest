import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Verificar si el usuario está autenticado
    if (!this.authService.isLoggedIn()) {
      return next.handle(request);
    }

    // Solo agregar token a solicitudes API específicas (puedes ajustar esto según tus necesidades)
    // Por ejemplo, solo agregar token a solicitudes a tu API backend
    if (!request.url.includes('api.your-domain.com')) {
      return next.handle(request);
    }

    // Obtener el token y agregarlo al encabezado de la solicitud
    return from(this.authService.getAccessToken(['User.Read'])).pipe(
      switchMap(token => {
        if (token) {
          // Clonar la solicitud y agregar el token
          const authRequest = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next.handle(authRequest);
        }
        // Si no hay token, continuar con la solicitud original
        return next.handle(request);
      })
    );
  }
}

// Proveedor para el interceptor
export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}; 