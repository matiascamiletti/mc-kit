import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, RedirectCommand, Router } from '@angular/router';
import { map } from 'rxjs';
import { MCAuthenticationService } from '../services/authentication.service';
import { MCPermissionService } from '../services/mc-permission.service';
import {
  MCMatchMode,
  MCRoleCheckType,
  MC_PERMISSION_CONFIG,
} from '../entities/mc-role-permission.models';

/**
 * Functional guard that verifies if the current user possesses required roles configured in `route.data['roles']`.
 * 
 * Example route configuration:
 * ```typescript
 * {
 *   path: 'admin',
 *   component: AdminComponent,
 *   canActivate: [mcAuthGuard, mcRoleGuard],
 *   data: {
 *     roles: ['admin', 'manager'],
 *     roleMode: 'ANY', // or 'ALL'
 *     redirectTo: '/forbidden' // optional
 *   }
 * }
 * ```
 */
export const mcRoleGuard: CanActivateFn & CanMatchFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(MCAuthenticationService);
  const permissionService = inject(MCPermissionService);
  const config = inject(MC_PERMISSION_CONFIG, { optional: true });

  const requiredRoles: MCRoleCheckType | MCRoleCheckType[] | undefined =
    route.data?.['roles'] ?? route.data?.['role'];
  const mode: MCMatchMode = route.data?.['roleMode'] ?? 'ANY';
  const redirectTo: string | null | undefined =
    route.data?.['redirectTo'] ?? config?.defaultRedirectUrl;
  const queryParams: Record<string, any> | undefined = route.data?.['redirectQueryParams'];

  // If no roles specified on the route, let it pass
  if (!requiredRoles || (Array.isArray(requiredRoles) && requiredRoles.length === 0)) {
    return true;
  }

  return authService.getUser().pipe(
    map((user) => {
      permissionService.loadUser(user);
      const hasAccess = permissionService.hasRole(requiredRoles, mode);

      if (hasAccess) {
        return true;
      }

      if (redirectTo) {
        const urlTree = router.parseUrl(redirectTo);
        if (queryParams) {
          urlTree.queryParams = { ...urlTree.queryParams, ...queryParams };
        }
        return new RedirectCommand(urlTree, { skipLocationChange: false });
      }

      return false;
    })
  );
};

/**
 * Factory function to create parameterized role guards directly in route definitions.
 * 
 * Example:
 * ```typescript
 * {
 *   path: 'dashboard',
 *   component: DashboardComponent,
 *   canActivate: [createRoleGuard('admin', { redirectTo: '/unauthorized' })]
 * }
 * ```
 */
export function createRoleGuard(
  roles: MCRoleCheckType | MCRoleCheckType[],
  options?: {
    mode?: MCMatchMode;
    redirectTo?: string | null;
    queryParams?: Record<string, any>;
  }
): CanActivateFn {
  return () => {
    const router = inject(Router);
    const authService = inject(MCAuthenticationService);
    const permissionService = inject(MCPermissionService);
    const config = inject(MC_PERMISSION_CONFIG, { optional: true });

    const mode = options?.mode ?? 'ANY';
    const redirectTo = options?.redirectTo ?? config?.defaultRedirectUrl;

    return authService.getUser().pipe(
      map((user) => {
        permissionService.loadUser(user);
        const hasAccess = permissionService.hasRole(roles, mode);

        if (hasAccess) {
          return true;
        }

        if (redirectTo) {
          const urlTree = router.parseUrl(redirectTo);
          if (options?.queryParams) {
            urlTree.queryParams = { ...urlTree.queryParams, ...options.queryParams };
          }
          return new RedirectCommand(urlTree, { skipLocationChange: false });
        }

        return false;
      })
    );
  };
}
