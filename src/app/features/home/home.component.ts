import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container">
      <h1>Bienvenido a la Demo de MSAL para Angular</h1>
      
      <div class="instructions-card">
        <h2>Pasos para configurar la autenticación</h2>
        <ol>
          <li>
            <strong>Registra una aplicación en el Portal de Azure</strong>
            <p>Accede al <a href="https://portal.azure.com/" target="_blank">Portal de Azure</a> y registra una nueva aplicación en Azure Active Directory.</p>
          </li>
          <li>
            <strong>Configura las URIs de redirección</strong>
            <p>Agrega tu URL de desarrollo como URI de redirección (por ejemplo, http://localhost:4200).</p>
          </li>
          <li>
            <strong>Configura los permisos de API</strong>
            <p>Agrega permisos para Microsoft Graph (User.Read como mínimo).</p>
          </li>
          <li>
            <strong>Actualiza la configuración de MSAL</strong>
            <p>Abre el archivo <code>src/app/core/auth/msal-config.ts</code> y actualiza los siguientes valores:</p>
            <pre><code>clientId: 'TU_CLIENT_ID',
authority: 'https://login.microsoftonline.com/TU_TENANT_ID'</code></pre>
          </li>
        </ol>
      </div>

      <div class="actions">
        <a routerLink="/login" class="cta-button">Iniciar sesión</a>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem 0;
    }
    
    h1 {
      text-align: center;
      color: #0078d4;
      margin-bottom: 2rem;
    }
    
    .instructions-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      padding: 2rem;
      margin-bottom: 2rem;
    }
    
    h2 {
      color: #333;
      margin-bottom: 1.5rem;
    }
    
    ol {
      padding-left: 1.5rem;
    }
    
    li {
      margin-bottom: 1.5rem;
    }
    
    li strong {
      display: block;
      margin-bottom: 0.5rem;
      color: #0078d4;
    }
    
    a {
      color: #0078d4;
      text-decoration: none;
    }
    
    a:hover {
      text-decoration: underline;
    }
    
    pre {
      background-color: #f5f5f5;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
      margin-top: 0.5rem;
    }
    
    code {
      font-family: 'Courier New', Courier, monospace;
    }
    
    .actions {
      display: flex;
      justify-content: center;
    }
    
    .cta-button {
      display: inline-block;
      background-color: #0078d4;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      font-weight: bold;
      transition: background-color 0.3s;
    }
    
    .cta-button:hover {
      background-color: #106ebe;
      text-decoration: none;
    }
  `]
})
export class HomeComponent {} 