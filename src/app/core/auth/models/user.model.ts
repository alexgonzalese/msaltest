export interface User {
  id?: string;
  username: string;
  displayName?: string;
  email?: string;
  roles?: string[];
  // Otros campos que puedas necesitar
}

export interface UserProfile {
  // Propiedades del perfil completo del usuario
  // que podrías obtener desde Microsoft Graph API
  id: string;
  userPrincipalName: string;
  displayName: string;
  givenName?: string;
  surname?: string;
  mail?: string;
  jobTitle?: string;
  mobilePhone?: string;
  officeLocation?: string;
  preferredLanguage?: string;
  businessPhones?: string[];
} 