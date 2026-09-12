import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { MC_AUTH_CONFIG, MCAuthConfig } from '../entities/mc-auth-config';
import { MC_PERMISSION_CONFIG, MCPermissionConfig } from '../entities/mc-role-permission.models';
import { MCPermissionService } from '../services/mc-permission.service';

/**
 * Provides configuration for the MC Authentication module.
 */
export function provideMCAuth(value: MCAuthConfig): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: MC_AUTH_CONFIG, useValue: value }]);
}

/**
 * Provides configuration and initializes the MC Roles & Permissions system.
 */
export function provideMCPermissions(config?: Partial<MCPermissionConfig>): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: MC_PERMISSION_CONFIG, useValue: config ?? {} },
    MCPermissionService,
  ]);
}
