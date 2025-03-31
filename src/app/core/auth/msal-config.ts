import { Configuration, LogLevel, BrowserCacheLocation } from '@azure/msal-browser';

// Los siguientes valores son para demostración - deberás reemplazarlos con tus propios valores
export const msalConfig: Configuration = {
  auth: {
    clientId: 'YOUR_CLIENT_ID', // Reemplazar con el ID de cliente de tu aplicación Azure AD
    authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID', // Reemplazar con tu tenant ID
    redirectUri: window.location.origin, // Esto redirige de vuelta a tu aplicación después de iniciar sesión
    postLogoutRedirectUri: window.location.origin, // Esto redirige después de cerrar sesión
    navigateToLoginRequestUrl: true
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: false
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Info:
            console.info(message);
            break;
          case LogLevel.Verbose:
            console.debug(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
        }
      },
      logLevel: LogLevel.Info
    }
  }
};

// Ámbitos de permisos que la aplicación necesita
export const loginRequest = {
  scopes: ['openid', 'profile', 'User.Read']
};

// Ámbitos opcionales que pueden solicitarse más tarde
export const tokenRequest = {
  scopes: ['User.Read', 'Mail.Read']
}; 