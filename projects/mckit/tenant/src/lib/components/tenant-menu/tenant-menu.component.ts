import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { MCComponent, MCCoreComponent } from '@mckit/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ImageModule } from 'primeng/image';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MCTenantService } from '../../services/tenant.service';
import { MCTenant } from '../../entities/mc_tenant';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'mc-tenant-menu',
  imports: [CommonModule, MenuModule, ButtonModule, ImageModule, SplitButtonModule],
  templateUrl: './tenant-menu.component.html',
  styleUrl: './tenant-menu.component.scss'
})
export class TenantMenuComponent extends MCCoreComponent implements OnDestroy {

  tenantService = inject(MCTenantService);

  current = signal<MCTenant | undefined>(undefined);
  currentSubscription?: Subscription;

  isLoading = signal(true);

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.loadCurrent();
    this.loadAllTenants();

      this.items = [
          {
              label: 'Tenant 1',
              icon: 'pi pi-refresh'
          },
          {
              label: 'Tenant 2',
              icon: 'pi pi-times'
          },
          {
              label: 'Tenant 3',
              icon: 'pi pi-external-link'
          }
      ];
  }

  ngOnDestroy() {
    this.currentSubscription?.unsubscribe();
  }

  loadAllTenants() {
    this.tenantService.list('')
  }

  loadCurrent() {
    this.currentSubscription = this.tenantService.getCurrent()
    .pipe(
      tap((tenant: MCTenant | undefined) => this.current.set(tenant)),
      tap(() => this.isLoading.set(false))
    )
    .subscribe();
  }
}

export class MCTenantMenu extends MCComponent {
  constructor() {
    super(TenantMenuComponent);
    this.config = {};
  }
}
