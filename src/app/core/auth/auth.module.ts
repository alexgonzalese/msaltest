import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalModule, MsalInterceptor, MsalGuard, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';

import { msalConfig } from './msal-config';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor, AuthInterceptorProvider } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MsalModule.forRoot(
      new PublicClientApplication(msalConfig),
      {
        // Configuración por defecto de MSAL Angular
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: ['openid', 'profile', 'User.Read']
        },
      },
      {
        // Configuraciones de protección de ruta
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          ['https://graph.microsoft.com/v1.0/me', ['User.Read']],
          // Agrega aquí tus API protegidas y sus scopes
          // ['https://api.your-domain.com', ['api.scope']]
        ]),
      }
    )
  ],
  providers: [
    AuthService,
    AuthGuard,
    AuthInterceptorProvider,
    // Si prefieres usar el interceptor de MSAL en lugar del personalizado
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: MsalInterceptor,
    //   multi: true
    // }
  ],
  exports: [
    MsalModule
  ]
})
export class AuthModule { } 