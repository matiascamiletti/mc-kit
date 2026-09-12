import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, RedirectCommand, Router } from '@angular/router';
import { map } from 'rxjs';
import { MCAuthenticationService } from '../services/authentication.service';
import { MCPermissionService } from '../services/mc-permission.service';
import {
  MCMatchMode,
  MCPermissionCheckType,
  MC_PERMISSION_CONFIG,
} from '../entities/mc-role-permission.models';

/**
 * Functional guard that verifies if the current user possesses required permissions configured in `route.data['permissions']`.
 * 
 * Example route configuration:
 * ```typescript
 * {
 *   path: 'users',
 *   component: UsersComponent,
 *   canActivate: [mcAuthGuard, mcPermissionGuard],
 *   data: {
 *     permissions: ['users:read', 'users:write'],
 *     permissionMode: 'ALL', // or 'ANY'
 *     redirectTo: '/forbidden'
 *   }
 * }
 * ```
 */
export const mcPermissionGuard: CanActivateFn & CanMatchFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(MCAuthenticationService);
  const permissionService = inject(MCPermissionService);
  const config = inject(MC_PERMISSION_CONFIG, { optional: true });

  const requiredPerms: MCPermissionCheckType | MCPermissionCheckType[] | undefined =
    route.data?.['permissions'] ?? route.data?.['permission'];
  const mode: MCMatchMode = route.data?.['permissionMode'] ?? 'ANY';
  const redirectTo: string | null | undefined =
    route.data?.['redirectTo'] ?? config?.defaultRedirectUrl;
  const queryParams: Record<string, any> | undefined = route.data?.['redirectQueryParams'];

  // If no permissions specified on the route, let it pass
  if (!requiredPerms || (Array.isArray(requiredPerms) && requiredPerms.length === 0)) {
    return true;
  }

  return authService.getUser().pipe(
    map((user) => {
      permissionService.loadUser(user);
      const hasAccess = permissionService.hasPermission(requiredPerms, mode);

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
 * Factory function to create parameterized permission guards directly in route definitions.
 * 
 * Example:
 * ```typescript
 * {
 *   path: 'products/create',
 *   component: ProductCreateComponent,
 *   canActivate: [createPermissionGuard('products:create', { redirectTo: '/forbidden' })]
 * }
 * ```
 */
export function createPermissionGuard(
  permissions: MCPermissionCheckType | MCPermissionCheckType[],
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
        const hasAccess = permissionService.hasPermission(permissions, mode);

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
