# Auth - MC Kit

Core para integrar fácilmente autenticación, autorización basada en roles (RBAC) y permisos (PBAC) en tu plataforma Angular. Incluye servicios reactivos con Signals, guards funcionales, directivas estructurales, pipes y páginas de login maquetadas.

## Table of Contents

- [Installation](#installation)
- [Roles & Permissions](#roles--permissions)
  - [1. Providers Setup](#1-providers-setup)
  - [2. Route Guards](#2-route-guards)
  - [3. Permission Service (Signals & Observables)](#3-permission-service-signals--observables)
  - [4. Structural Directives](#4-structural-directives)
  - [5. Pipes](#5-pipes)
- [Use Login Page Layout](#use-login-page-layout)

---

## Installation

### 1. Install libraries

```bash
npm install --save @ngx-pwa/local-storage @mckit/auth
```

---

## Roles & Permissions

### 1. Providers Setup

En tu `app.config.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideMCAuth, provideMCPermissions } from '@mckit/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideMCAuth({
      baseUrl: 'https://api.example.com/',
    }),
    provideMCPermissions({
      superAdminRole: 'superadmin', // Este rol tiene acceso total y bypass de permisos
      wildcardEnabled: true,        // Habilita comodines como 'users:*' o '*' (default: true)
      defaultRedirectUrl: '/forbidden',
    }),
  ],
};
```

### 2. Route Guards

#### Uso con `route.data`

```typescript
import { Routes } from '@angular/router';
import { mcAuthGuard, mcRoleGuard, mcPermissionGuard, mcAuthAccessGuard } from '@mckit/auth';

export const routes: Routes = [
  // Protección por Roles
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [mcAuthGuard, mcRoleGuard],
    data: {
      roles: ['admin', 'manager'],
      roleMode: 'ANY', // 'ANY' (por defecto) o 'ALL'
      redirectTo: '/forbidden',
    },
  },

  // Protección por Permisos (soporta comodines como 'users:*')
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [mcAuthGuard, mcPermissionGuard],
    data: {
      permissions: ['users:read', 'users:write'],
      permissionMode: 'ALL',
      redirectTo: '/forbidden',
    },
  },

  // Guard todo en uno (Autenticación + Roles + Permisos)
  {
    path: 'billing',
    component: BillingComponent,
    canActivate: [mcAuthAccessGuard],
    data: {
      roles: ['admin'],
      permissions: ['billing:*'],
      redirectTo: '/forbidden',
    },
  },
];
```

#### Uso con Factory Functions

```typescript
import { createRoleGuard, createPermissionGuard } from '@mckit/auth';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [createRoleGuard('admin', { redirectTo: '/forbidden' })],
  },
  {
    path: 'articles/new',
    component: ArticleCreateComponent,
    canActivate: [createPermissionGuard('articles:create')],
  },
];
```

### 3. Permission Service (Signals & Observables)

```typescript
import { Component, inject } from '@angular/core';
import { MCPermissionService } from '@mckit/auth';

@Component({
  standalone: true,
  template: `
    @if (permissionService.hasRole('admin')) {
      <button (click)="deleteUser()">Eliminar Usuario</button>
    }

    @if (permissionService.can('export', 'reports')) {
      <button (click)="exportReport()">Exportar</button>
    }

    <!-- Signals reactivos directos -->
    <p>Roles: {{ permissionService.roles() | json }}</p>
    <p>Permisos: {{ permissionService.permissionNames() | json }}</p>
  `,
})
export class UserProfileComponent {
  permissionService = inject(MCPermissionService);

  checkAccess() {
    // Roles
    const isAdmin = this.permissionService.hasRole('admin');
    const isManagerOrEditor = this.permissionService.hasRole(['manager', 'editor'], 'ANY');

    // Permisos
    const canEditUsers = this.permissionService.hasPermission('users:edit');
    const canAll = this.permissionService.hasPermission(['users:create', 'users:delete'], 'ALL');

    // Comprobación rápida subject:action
    const canPublish = this.permissionService.can('publish', 'articles');

    // Gestión dinámica en runtime
    this.permissionService.addPermission('articles:featured');
    this.permissionService.removePermission('articles:delete');
  }
}
```

### 4. Structural Directives

Importa `MCHasRoleDirective` y `MCHasPermissionDirective` en tus componentes:

```typescript
import { Component } from '@angular/core';
import { MCHasRoleDirective, MCHasPermissionDirective } from '@mckit/auth';

@Component({
  standalone: true,
  imports: [MCHasRoleDirective, MCHasPermissionDirective],
  template: `
    <!-- Directiva por Roles -->
    <button *mcHasRole="'admin'">Panel de Administración</button>

    <div *mcHasRole="['admin', 'manager']; mode: 'ANY'; else noRoleTpl">
      Contenido para Administradores o Managers
    </div>
    <ng-template #noRoleTpl>
      <p>No tienes el rol requerido.</p>
    </ng-template>

    <!-- Directiva por Permisos -->
    <button *mcHasPermission="'users:create'">Crear Usuario</button>

    <div *mcHasPermission="['users:create', 'users:delete']; mode: 'ALL'; else noPermTpl">
      Operaciones avanzadas
    </div>
    <ng-template #noPermTpl>
      <p>Permisos insuficientes.</p>
    </ng-template>

    <!-- Por objeto de permiso -->
    <button *mcHasPermission="{ subject: 'articles', action: 'publish' }">Publicar</button>
  `,
})
export class ExampleComponent {}
```

### 5. Pipes

Importa `MCHasRolePipe` y `MCHasPermissionPipe`:

```html
<button [disabled]="!('users:edit' | mcHasPermission)">Editar</button>
<button [disabled]="!(['admin', 'superadmin'] | mcHasRole:'ANY')">Configurar</button>
```

---

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
