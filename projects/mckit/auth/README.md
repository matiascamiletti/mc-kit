# Auth - MC Kit

Core para integrar facilmente Auth en tu plataforma. Incluye paginas de login ya maquetadas.

## Table of Contents

- [Installation](#installation)
  - [1. Install MIA Core](#1-install-mia-core)
  - [1. Install libraries](#1-install-libraries)
  - [2. Add Styles](#2-add-styles)
- [Use Login Page Layout](#use-login-page-layout)
  - [1. Create component](#1-create-component)
  - [1. Install libraries](#1-install-libraries)
  - [2. Add Styles](#2-add-styles)

## Installation

### 1. Install MIA Core

[Instalar MIA Core](https://github.com/matiascamiletti/mc-kit/blob/main/projects/mckit/core/README.md#1-install-libraries)

### 2. Install libraries

```bash
npm install --save @ngx-pwa/local-storage@19 @mckit/auth
```

## Use Login Page Layout

### 1. Create component

```html
<mc-auth-basic #authComp [config]="config" (submit)="onLogin($event)"></mc-auth-basic>
```

```typescript
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
  this.config.resetPassword = '¿Olvidaste tu contraseña?';
  this.config.resetPasswordLink = '/reset-password';
  this.config.register = '¿No tienes una cuenta?';
  this.config.registerLink = '/register';
}
```

