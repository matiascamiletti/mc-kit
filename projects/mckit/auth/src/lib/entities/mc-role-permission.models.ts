import { InjectionToken } from '@angular/core';
import { MCPermission } from './mc-permission.entity';
import { MCRole } from './mc-role.entity';

/**
 * Matching mode for multiple roles or permissions evaluation.
 * - 'ANY' | 'any' | 'OR': Passes if the user has at least one matching item.
 * - 'ALL' | 'all' | 'AND': Passes only if the user has all matching items.
 */
export type MCMatchMode = 'ANY' | 'ALL' | 'any' | 'all' | 'OR' | 'AND';

/**
 * Object representation for a permission check.
 */
export interface MCPermissionObject {
  subject: string;
  action: string;
  fields?: any;
  conditions?: any;
  reason?: string;
}

/**
 * Types accepted when checking permissions:
 * - String: 'users:read', 'orders:*', '*'
 * - MCPermission instance
 * - Permission object: { subject: 'users', action: 'read' }
 */
export type MCPermissionCheckType = string | MCPermission | MCPermissionObject;

/**
 * Types accepted when checking roles:
 * - String: 'admin', 'editor'
 * - Number: 1, 2
 * - MCRole instance
 */
export type MCRoleCheckType = string | number | MCRole;

/**
 * Configuration payload passed to route `data` or guards.
 */
export interface MCPermissionGuardData {
  /**
   * Required role or list of roles.
   */
  roles?: MCRoleCheckType | MCRoleCheckType[];
  /**
   * Matching mode for roles (default: 'ANY').
   */
  roleMode?: MCMatchMode;
  /**
   * Required permission or list of permissions.
   */
  permissions?: MCPermissionCheckType | MCPermissionCheckType[];
  /**
   * Matching mode for permissions (default: 'ANY').
   */
  permissionMode?: MCMatchMode;
  /**
   * Route to redirect if access is denied. If null/undefined, cancels navigation without redirect.
   */
  redirectTo?: string | null;
  /**
   * Query parameters to attach to the redirect route.
   */
  redirectQueryParams?: Record<string, any>;
}

/**
 * Global configuration options for the permissions engine.
 */
export interface MCPermissionConfig {
  /**
   * Role or roles that bypass all permission checks (e.g. 'admin', 'superadmin', 1).
   */
  superAdminRole?: string | number | (string | number)[];
  /**
   * Enable wildcards like 'users:*' or '*' matching all actions/subjects (default: true).
   */
  wildcardEnabled?: boolean;
  /**
   * Default route to redirect to when access is denied in guards.
   */
  defaultRedirectUrl?: string | null;
  /**
   * Custom extractor function for roles from MCUser.
   */
  roleExtractor?: (user: any) => (string | number)[];
  /**
   * Custom extractor function for permissions from MCUser.
   */
  permissionExtractor?: (user: any) => (string | MCPermission)[];
}

/**
 * Injection token for MCPermissionConfig.
 */
export const MC_PERMISSION_CONFIG = new InjectionToken<MCPermissionConfig>('mc.permission.config');
