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
import { MCMatchMode, MCPermissionCheckType } from '../entities/mc-role-permission.models';

/**
 * Structural directive that conditionally renders content based on user permissions.
 * 
 * Usage examples:
 * ```html
 * <!-- Single string permission -->
 * <button *mcHasPermission="'users:create'">Create User</button>
 * 
 * <!-- Multiple permissions with ANY (default) -->
 * <div *mcHasPermission="['users:create', 'users:edit']">User Management Tools</div>
 * 
 * <!-- Multiple permissions with ALL mode and fallback template -->
 * <div *mcHasPermission="['users:delete', 'system:manage']; mode: 'ALL'; else noAccess">Dangerous Operations</div>
 * <ng-template #noAccess>
 *   <p>You lack necessary administrative permissions.</p>
 * </ng-template>
 * 
 * <!-- Permission object -->
 * <button *mcHasPermission="{ subject: 'articles', action: 'publish' }">Publish Article</button>
 * ```
 */
@Directive({
  selector: '[mcHasPermission]',
  standalone: true,
})
export class MCHasPermissionDirective {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private permissionService = inject(MCPermissionService);

  private permissionsSignal = signal<MCPermissionCheckType | MCPermissionCheckType[] | undefined>(
    undefined
  );
  private modeSignal = signal<MCMatchMode>('ANY');
  private elseTemplateSignal = signal<TemplateRef<any> | null>(null);

  private hasView = false;
  private hasElseView = false;

  @Input()
  set mcHasPermission(permissions: MCPermissionCheckType | MCPermissionCheckType[]) {
    this.permissionsSignal.set(permissions);
  }

  @Input()
  set mcHasPermissionMode(mode: MCMatchMode) {
    this.modeSignal.set(mode);
  }

  @Input()
  set mcHasPermissionElse(template: TemplateRef<any> | null) {
    this.elseTemplateSignal.set(template);
  }

  constructor() {
    effect(() => {
      // Triggered reactively whenever permissionsSignal, modeSignal, elseTemplateSignal or service signals change
      const perms = this.permissionsSignal();
      const mode = this.modeSignal();
      const elseTemplate = this.elseTemplateSignal();
      // Track reactive signals from service
      this.permissionService.permissions();
      this.permissionService.roles();

      if (perms === undefined || perms === null || (Array.isArray(perms) && perms.length === 0)) {
        this.clearView();
        return;
      }

      const hasAccess = this.permissionService.hasPermission(perms, mode);

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
