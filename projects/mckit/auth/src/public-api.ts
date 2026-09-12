/*
 * Public API Surface of @mckit/auth
 */

/**
 * Entities & Models
 */
export * from './lib/entities/mc-user';
export * from './lib/entities/mc-auth-config';
export * from './lib/entities/mc-auth-model';
export * from './lib/entities/mc-base-auth-page-config';
export * from './lib/entities/mc-permission.entity';
export * from './lib/entities/mc-role.entity';
export * from './lib/entities/mc-role-permission.models';

/**
 * Providers
 */
export * from './lib/providers/auth.provider';

/**
 * Services
 */
export * from './lib/services/authentication.service';
export * from './lib/services/mc-permission.service';

/**
 * Interceptors
 */
export * from './lib/interceptors/auth.interceptor';
export * from './lib/interceptors/auth-cookie.interceptor';

/**
 * Guards
 */
export * from './lib/guards/auth.guard';
export * from './lib/guards/mc-role.guard';
export * from './lib/guards/mc-permission.guard';
export * from './lib/guards/mc-auth-access.guard';

/**
 * Directives
 */
export * from './lib/directives/mc-has-role.directive';
export * from './lib/directives/mc-has-permission.directive';

/**
 * Resolvers
 */
export * from './lib/resolvers/user.resolver';

/**
 * Pipes
 */
export * from './lib/pipes/initial-name.pipe';
export * from './lib/pipes/mc-has-role.pipe';
export * from './lib/pipes/mc-has-permission.pipe';

/**
 * Components
 */
export * from './lib/components/avatar-with-menu/avatar-with-menu.component';

/**
 * Pages
 */
export * from './lib/pages/base-auth-page.component';
export * from './lib/pages/auth-basic/auth-basic.component';
export * from './lib/pages/auth-half/auth-half.component';
export * from './lib/pages/auth-sakai/auth-sakai.component';
export * from './lib/pages/auth-sakai-only-social/auth-sakai-only-social.component';
