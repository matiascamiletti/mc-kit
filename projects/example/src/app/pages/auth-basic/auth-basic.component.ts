import { Component, OnInit } from '@angular/core';
import { MCAuthBasicComponent, MCAuthBasicConfig, MCAuthModel } from '../../../../../mckit/auth/src/public-api';

@Component({
  selector: 'app-auth-basic',
  standalone: true,
  imports: [MCAuthBasicComponent],
  templateUrl: './auth-basic.component.html',
  styleUrl: './auth-basic.component.scss'
})
export class AuthBasicComponent implements OnInit {
  config!: MCAuthBasicConfig;

  constructor() { }

  ngOnInit(): void {
    this.loadConfig();
  }

  onLogin(data: MCAuthModel) {
    console.log(data);
  }

  loadConfig() {
    this.config = new MCAuthBasicConfig();
    this.config.title = 'Inicio de sesión';
    this.config.subtitle = 'Por favor, inicie sesión para continuar';
    this.config.emailPlaceholder = 'Correo electrónico';
    this.config.passwordPlaceholder = 'Contraseña';
    this.config.submitButton = 'Iniciar sesión';
  }
}
