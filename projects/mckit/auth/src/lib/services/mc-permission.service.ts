import { inject, Injectable, signal, computed } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MCAuthenticationService } from './authentication.service';
import { MCPermission } from '../entities/mc-permission.entity';
import { MCRole } from '../entities/mc-role.entity';
import { MCUser } from '../entities/mc-user';
import {
  MCMatchMode,
  MCPermissionCheckType,
  MCPermissionConfig,
  MCPermissionGuardData,
  MCPermissionObject,
  MCRoleCheckType,
  MC_PERMISSION_CONFIG,
} from '../entities/mc-role-permission.models';

@Injectable({
  providedIn: 'root',
})
export class MCPermissionService {
  protected authService = inject(MCAuthenticationService);
  protected config: MCPermissionConfig | null = inject(MC_PERMISSION_CONFIG, { optional: true });

  /**
   * Current active roles of the authenticated user.
   */
  public roles = signal<string[]>([]);

  /**
   * Current active permissions granted to the authenticated user.
   */
  public permissions = signal<MCPermission[]>([]);

  /**
   * Current user signal reference.
   */
  public currentUser = signal<MCUser | undefined>(undefined);

  /**
   * List of permission string identifiers (e.g. ['users:read', 'orders:create']).
   */
  public permissionNames = computed(() =>
    this.permissions().map((p) => MCPermission.toName(p).toLowerCase())
  );

  constructor() {
    this.initialize();
  }

  /**
   * Initializes permissions by subscribing to user authentication state.
   */
  public initialize(): void {
    this.authService.getUser().subscribe((user) => {
      this.loadUser(user);
    });
  }

  /**
   * Loads user data and extracts their roles and permissions.
   */
  public loadUser(user: MCUser | undefined): void {
    this.currentUser.set(user);
    if (!user) {
      this.clear();
      return;
    }

    const extractedRoles = this.extractRoles(user);
    const extractedPermissions = this.extractPermissions(user);

    this.roles.set(extractedRoles);
    this.permissions.set(extractedPermissions);
  }

  /**
   * Manually sets the roles.
   */
  public setRoles(roles: (string | number | MCRole)[]): void {
    const normalized = roles.map((r) => MCRole.toName(r)).filter((r) => r.length > 0);
    this.roles.set(Array.from(new Set(normalized)));
  }

  /**
   * Adds one or more roles to the current role set.
   */
  public addRole(...roles: (string | number | MCRole)[]): void {
    const current = new Set(this.roles());
    for (const r of roles) {
      const name = MCRole.toName(r);
      if (name) {
        current.add(name);
      }
    }
    this.roles.set(Array.from(current));
  }

  /**
   * Removes one or more roles from the current set.
   */
  public removeRole(...roles: (string | number | MCRole)[]): void {
    const toRemove = new Set(roles.map((r) => MCRole.toName(r).toLowerCase()));
    this.roles.set(this.roles().filter((r) => !toRemove.has(r.toLowerCase())));
  }

  /**
   * Manually sets the permissions list.
   */
  public setPermissions(permissions: (string | MCPermission | MCPermissionObject)[]): void {
    const normalized = permissions.map((p) => MCPermission.from(p));
    this.permissions.set(normalized);
  }

  /**
   * Adds one or more permissions to the current permissions set.
   */
  public addPermission(...permissions: (string | MCPermission | MCPermissionObject)[]): void {
    const current = [...this.permissions()];
    for (const p of permissions) {
      const permObj = MCPermission.from(p);
      const name = MCPermission.toName(permObj).toLowerCase();
      if (!current.some((existing) => MCPermission.toName(existing).toLowerCase() === name)) {
        current.push(permObj);
      }
    }
    this.permissions.set(current);
  }

  /**
   * Removes one or more permissions.
   */
  public removePermission(...permissions: (string | MCPermission | MCPermissionObject)[]): void {
    const toRemove = new Set(
      permissions.map((p) => MCPermission.toName(MCPermission.from(p)).toLowerCase())
    );
    this.permissions.set(
      this.permissions().filter((p) => !toRemove.has(MCPermission.toName(p).toLowerCase()))
    );
  }

  /**
   * Clears all loaded roles and permissions.
   */
  public clear(): void {
    this.roles.set([]);
    this.permissions.set([]);
    this.currentUser.set(undefined);
  }

  /**
   * Checks if the current user has superadmin status (bypassing permission checks).
   */
  public isSuperAdmin(): boolean {
    if (!this.config?.superAdminRole) {
      return false;
    }
    const superRoles = Array.isArray(this.config.superAdminRole)
      ? this.config.superAdminRole
      : [this.config.superAdminRole];

    return superRoles.some((sr) => this.hasRole(sr));
  }

  /**
   * Checks if user has a given role or list of roles.
   * @param role Single role or array of roles.
   * @param mode 'ANY' (default) passes if user has at least one role; 'ALL' requires all roles.
   */
  public hasRole(role: MCRoleCheckType | MCRoleCheckType[], mode: MCMatchMode = 'ANY'): boolean {
    const targetRoles = Array.isArray(role) ? role : [role];
    if (targetRoles.length === 0) {
      return true;
    }

    const currentRoles = this.roles();
    const isAll = mode.toUpperCase() === 'ALL' || mode.toUpperCase() === 'AND';

    if (isAll) {
      return targetRoles.every((t) => currentRoles.some((cr) => MCRole.matches(cr, t)));
    }
    return targetRoles.some((t) => currentRoles.some((cr) => MCRole.matches(cr, t)));
  }

  /**
   * Checks if user has a given permission or list of permissions.
   * @param permission Single permission or array of permissions.
   * @param mode 'ANY' (default) passes if user has at least one permission; 'ALL' requires all.
   */
  public hasPermission(
    permission: MCPermissionCheckType | MCPermissionCheckType[],
    mode: MCMatchMode = 'ANY'
  ): boolean {
    if (this.isSuperAdmin()) {
      return true;
    }

    const targetPermissions = Array.isArray(permission) ? permission : [permission];
    if (targetPermissions.length === 0) {
      return true;
    }

    const currentPerms = this.permissions();
    const wildcard = this.config?.wildcardEnabled ?? true;
    const isAll = mode.toUpperCase() === 'ALL' || mode.toUpperCase() === 'AND';

    if (isAll) {
      return targetPermissions.every((target) =>
        currentPerms.some((cp) => MCPermission.matches(cp, target, wildcard))
      );
    }
    return targetPermissions.some((target) =>
      currentPerms.some((cp) => MCPermission.matches(cp, target, wildcard))
    );
  }

  /**
   * Convenience check: can the user perform the given action on a subject (e.g. can('read', 'users'))
   */
  public can(action: string, subject: string): boolean {
    return this.hasPermission({ subject, action });
  }

  /**
   * Evaluates if current user can pass according to the given guard data (roles & permissions).
   */
  public canPass(data?: MCPermissionGuardData): boolean {
    if (!data) {
      return true;
    }

    if (data.roles !== undefined) {
      const passedRoles = this.hasRole(data.roles, data.roleMode ?? 'ANY');
      if (!passedRoles) {
        return false;
      }
    }

    if (data.permissions !== undefined) {
      const passedPerms = this.hasPermission(data.permissions, data.permissionMode ?? 'ANY');
      if (!passedPerms) {
        return false;
      }
    }

    return true;
  }

  /**
   * Observable checking if current authenticated user has a specific role.
   */
  public hasRole$(
    role: MCRoleCheckType | MCRoleCheckType[],
    mode: MCMatchMode = 'ANY'
  ): Observable<boolean> {
    return this.authService.getUser().pipe(
      map((user) => {
        if (user && this.currentUser() !== user) {
          this.loadUser(user);
        }
        return this.hasRole(role, mode);
      })
    );
  }

  /**
   * Observable checking if current authenticated user has a specific permission.
   */
  public hasPermission$(
    permission: MCPermissionCheckType | MCPermissionCheckType[],
    mode: MCMatchMode = 'ANY'
  ): Observable<boolean> {
    return this.authService.getUser().pipe(
      map((user) => {
        if (user && this.currentUser() !== user) {
          this.loadUser(user);
        }
        return this.hasPermission(permission, mode);
      })
    );
  }

  /**
   * Extracts list of role strings from a user object.
   */
  protected extractRoles(user: MCUser): string[] {
    if (this.config?.roleExtractor) {
      return this.config.roleExtractor(user).map((r) => String(r));
    }

    const set = new Set<string>();

    if (user.roles && Array.isArray(user.roles)) {
      for (const r of user.roles) {
        const name = MCRole.toName(r);
        if (name) set.add(name);
      }
    }

    if (user.role !== undefined && user.role !== null && user.role !== 0 && user.role !== '') {
      set.add(String(user.role));
    }

    if (user.extra?.roles && Array.isArray(user.extra.roles)) {
      for (const r of user.extra.roles) {
        const name = MCRole.toName(r);
        if (name) set.add(name);
      }
    } else if (user.extra?.role) {
      set.add(String(user.extra.role));
    }

    return Array.from(set);
  }

  /**
   * Extracts list of MCPermission objects from a user object.
   */
  protected extractPermissions(user: MCUser): MCPermission[] {
    if (this.config?.permissionExtractor) {
      return this.config.permissionExtractor(user).map((p) => MCPermission.from(p));
    }

    const permissionsMap = new Map<string, MCPermission>();

    const addPerm = (p: any) => {
      if (!p) return;
      const permObj = MCPermission.from(p);
      const name = MCPermission.toName(permObj).toLowerCase();
      if (name && !permissionsMap.has(name)) {
        permissionsMap.set(name, permObj);
      }
    };

    if (user.permissions && Array.isArray(user.permissions)) {
      user.permissions.forEach(addPerm);
    }

    if (user.roles && Array.isArray(user.roles)) {
      for (const r of user.roles) {
        if (typeof r === 'object' && r && 'permissions' in r && Array.isArray(r.permissions)) {
          r.permissions.forEach(addPerm);
        }
      }
    }

    if (user.extra?.permissions && Array.isArray(user.extra.permissions)) {
      user.extra.permissions.forEach(addPerm);
    }

    return Array.from(permissionsMap.values());
  }
}
