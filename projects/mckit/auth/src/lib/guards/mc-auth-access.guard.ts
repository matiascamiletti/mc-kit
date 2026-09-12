import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, RedirectCommand, Router } from '@angular/router';
import { map } from 'rxjs';
import { MCAuthenticationService } from '../services/authentication.service';
import { MCPermissionService } from '../services/mc-permission.service';
import {
  MCMatchMode,
  MCPermissionCheckType,
  MCRoleCheckType,
  MC_PERMISSION_CONFIG,
} from '../entities/mc-role-permission.models';

/**
 * All-in-one guard that validates authentication first, and subsequently checks
 * roles and permissions defined in route `data`.
 * 
 * Example route configuration:
 * ```typescript
 * {
 *   path: 'settings',
 *   component: SettingsComponent,
 *   canActivate: [mcAuthAccessGuard],
 *   data: {
 *     roles: ['admin'],
 *     permissions: ['settings:write'],
 *     redirectTo: '/forbidden'
 *   }
 * }
 * ```
 */
export const mcAuthAccessGuard: CanActivateFn & CanMatchFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(MCAuthenticationService);
  const permissionService = inject(MCPermissionService);
  const config = inject(MC_PERMISSION_CONFIG, { optional: true });

  let paramRedirect = router.url;
  if (paramRedirect.includes('/login')) {
    paramRedirect = '';
  }

  const requiredRoles: MCRoleCheckType | MCRoleCheckType[] | undefined =
    route.data?.['roles'] ?? route.data?.['role'];
  const roleMode: MCMatchMode = route.data?.['roleMode'] ?? 'ANY';

  const requiredPerms: MCPermissionCheckType | MCPermissionCheckType[] | undefined =
    route.data?.['permissions'] ?? route.data?.['permission'];
  const permissionMode: MCMatchMode = route.data?.['permissionMode'] ?? 'ANY';

  const forbiddenRedirect: string | null | undefined =
    route.data?.['redirectTo'] ?? config?.defaultRedirectUrl;
  const queryParams: Record<string, any> | undefined = route.data?.['redirectQueryParams'];

  return authService.getUser().pipe(
    map((user) => {
      // 1. Check Authentication
      if (!user) {
        const loginPath = router.parseUrl('/login');
        loginPath.queryParams = {
          redirect: paramRedirect,
        };
        return new RedirectCommand(loginPath, { skipLocationChange: true });
      }

      // 2. Load user into permission service
      permissionService.loadUser(user);

      // 3. Check Roles
      if (requiredRoles && (!Array.isArray(requiredRoles) || requiredRoles.length > 0)) {
        const hasRoleAccess = permissionService.hasRole(requiredRoles, roleMode);
        if (!hasRoleAccess) {
          if (forbiddenRedirect) {
            const urlTree = router.parseUrl(forbiddenRedirect);
            if (queryParams) {
              urlTree.queryParams = { ...urlTree.queryParams, ...queryParams };
            }
            return new RedirectCommand(urlTree, { skipLocationChange: false });
          }
          return false;
        }
      }

      // 4. Check Permissions
      if (requiredPerms && (!Array.isArray(requiredPerms) || requiredPerms.length > 0)) {
        const hasPermAccess = permissionService.hasPermission(requiredPerms, permissionMode);
        if (!hasPermAccess) {
          if (forbiddenRedirect) {
            const urlTree = router.parseUrl(forbiddenRedirect);
            if (queryParams) {
              urlTree.queryParams = { ...urlTree.queryParams, ...queryParams };
            }
            return new RedirectCommand(urlTree, { skipLocationChange: false });
          }
          return false;
        }
      }

      return true;
    })
  );
};
