import { Component } from '@angular/core';
import { MCAuthModel, MCAuthSakaiComponent, MCAuthSakaiConfig } from '../../../../../mckit/auth/src/public-api';

@Component({
    selector: 'app-auth-sakai',
    imports: [MCAuthSakaiComponent],
    templateUrl: './auth-sakai.component.html',
    styleUrl: './auth-sakai.component.scss'
})
export class AuthSakaiComponent {
  config!: MCAuthSakaiConfig;

  ngOnInit(): void {
    this.loadConfig();
  }

  onLogin(data: MCAuthModel) {
    console.log(data);
  }

  onAction(type: string) {
    console.log(type);
  }

  loadConfig() {
    this.config = new MCAuthSakaiConfig();
    this.config.logo = 'https://sakai.primeng.org/assets/layout/images/logo-dark.svg';
    this.config.title = 'Sign in to Continue';
    this.config.subtitle = 'Admin Panel';
    this.config.emailPlaceholder = 'Correo electrónico';
    this.config.passwordPlaceholder = 'Contraseña';
    this.config.submitButton = 'Iniciar sesión';
    this.config.resetPassword = '¿Olvidaste tu contraseña?';
  }
}
