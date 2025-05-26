/*
 * Public API Surface of auth
 */

/**
 * Entities
 */
export * from './lib/entities/mc-user';
export * from './lib/entities/mc-auth-config';
export * from './lib/entities/mc-auth-model';
export * from './lib/entities/mc-base-auth-page-config';

/**
 * Providers
 */
export * from './lib/providers/auth.provider';

/**
 * Services
 */
export * from './lib/services/authentication.service';

/**
 * Interceptors
 */
export * from './lib/interceptors/auth.interceptor';

/**
 * Guards
 */
export * from './lib/guards/auth.guard';

/**
 * Resolvers
 */
export * from './lib/resolvers/user.resolver';

/**
 * Pipes
 */
export * from './lib/pipes/initial-name.pipe';

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
