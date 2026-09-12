import { Pipe, PipeTransform, inject } from '@angular/core';
import { MCPermissionService } from '../services/mc-permission.service';
import { MCMatchMode, MCPermissionCheckType } from '../entities/mc-role-permission.models';

/**
 * Pipe that evaluates whether the authenticated user has the specified permission(s).
 * 
 * Usage examples:
 * ```html
 * <div *ngIf="'users:delete' | mcHasPermission">Delete user action</div>
 * <button [disabled]="!(['users:read', 'users:write'] | mcHasPermission:'ALL')">Manage Users</button>
 * ```
 */
@Pipe({
  name: 'mcHasPermission',
  standalone: true,
  pure: false,
})
export class MCHasPermissionPipe implements PipeTransform {
  private permissionService = inject(MCPermissionService);

  transform(
    permission: MCPermissionCheckType | MCPermissionCheckType[],
    mode: MCMatchMode = 'ANY'
  ): boolean {
    if (!permission || (Array.isArray(permission) && permission.length === 0)) {
      return false;
    }
    return this.permissionService.hasPermission(permission, mode);
  }
}
