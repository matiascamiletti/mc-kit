import { Pipe, PipeTransform, inject } from '@angular/core';
import { MCPermissionService } from '../services/mc-permission.service';
import { MCMatchMode, MCRoleCheckType } from '../entities/mc-role-permission.models';

/**
 * Pipe that evaluates whether the authenticated user has the specified role(s).
 * 
 * Usage examples:
 * ```html
 * <div *ngIf="'admin' | mcHasRole">Admin visible</div>
 * <button [disabled]="!(['admin', 'editor'] | mcHasRole:'ANY')">Edit</button>
 * ```
 */
@Pipe({
  name: 'mcHasRole',
  standalone: true,
  pure: false,
})
export class MCHasRolePipe implements PipeTransform {
  private permissionService = inject(MCPermissionService);

  transform(role: MCRoleCheckType | MCRoleCheckType[], mode: MCMatchMode = 'ANY'): boolean {
    if (!role || (Array.isArray(role) && role.length === 0)) {
      return false;
    }
    return this.permissionService.hasRole(role, mode);
  }
}
