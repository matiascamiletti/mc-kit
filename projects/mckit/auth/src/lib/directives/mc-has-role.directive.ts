import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import { MCPermissionService } from '../services/mc-permission.service';
import { MCMatchMode, MCRoleCheckType } from '../entities/mc-role-permission.models';

/**
 * Structural directive that conditionally renders content based on user roles.
 * 
 * Usage examples:
 * ```html
 * <!-- Single role -->
 * <button *mcHasRole="'admin'">Admin Panel</button>
 * 
 * <!-- Multiple roles with ANY (default) -->
 * <div *mcHasRole="['admin', 'manager']">Manager or Admin Content</div>
 * 
 * <!-- Multiple roles with ALL mode and fallback template -->
 * <div *mcHasRole="['admin', 'finance']; mode: 'ALL'; else noAccess">Sensitive Info</div>
 * <ng-template #noAccess>
 *   <p>You need both Admin and Finance roles.</p>
 * </ng-template>
 * ```
 */
@Directive({
  selector: '[mcHasRole]',
  standalone: true,
})
export class MCHasRoleDirective {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private permissionService = inject(MCPermissionService);

  private rolesSignal = signal<MCRoleCheckType | MCRoleCheckType[] | undefined>(undefined);
  private modeSignal = signal<MCMatchMode>('ANY');
  private elseTemplateSignal = signal<TemplateRef<any> | null>(null);

  private hasView = false;
  private hasElseView = false;

  @Input()
  set mcHasRole(roles: MCRoleCheckType | MCRoleCheckType[]) {
    this.rolesSignal.set(roles);
  }

  @Input()
  set mcHasRoleMode(mode: MCMatchMode) {
    this.modeSignal.set(mode);
  }

  @Input()
  set mcHasRoleElse(template: TemplateRef<any> | null) {
    this.elseTemplateSignal.set(template);
  }

  constructor() {
    effect(() => {
      // Triggered reactively whenever rolesSignal, modeSignal, elseTemplateSignal or permissionService.roles() changes
      const roles = this.rolesSignal();
      const mode = this.modeSignal();
      const elseTemplate = this.elseTemplateSignal();
      // Track reactive signal from service
      this.permissionService.roles();

      if (roles === undefined || roles === null || (Array.isArray(roles) && roles.length === 0)) {
        this.clearView();
        return;
      }

      const hasAccess = this.permissionService.hasRole(roles, mode);

      if (hasAccess) {
        if (!this.hasView) {
          this.viewContainer.clear();
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.hasView = true;
          this.hasElseView = false;
        }
      } else {
        if (elseTemplate) {
          if (!this.hasElseView) {
            this.viewContainer.clear();
            this.viewContainer.createEmbeddedView(elseTemplate);
            this.hasView = false;
            this.hasElseView = true;
          }
        } else {
          this.clearView();
        }
      }
    });
  }

  private clearView(): void {
    this.viewContainer.clear();
    this.hasView = false;
    this.hasElseView = false;
  }
}
