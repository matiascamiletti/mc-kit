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

  items = signal<MenuItem[]>([]);

  ngOnInit() {
    this.loadCurrent();
    this.loadAllTenants();
  }

  ngOnDestroy() {
    this.currentSubscription?.unsubscribe();
  }

  loadAllTenants() {
    this.tenantService.list('')
      .pipe(
        tap(response => {
          const items: MenuItem[] = response.data.map(tenant => ({
            label: tenant.name,
            icon: 'pi pi-building',
            command: () => this.tenantService.clickTenant(tenant)
          }));
          if (this.component.config?.allowNewTenant) {
            items.push({
              label: 'New tenant',
              icon: 'pi pi-plus',
              command: () => this.tenantService.clickNew()
            });
          }
          this.items.set(items);
        })
      )
      .subscribe();
  }

  loadCurrent() {
    this.currentSubscription = this.tenantService.getCurrent()
      .pipe(
        tap((tenant: MCTenant | undefined) => this.current.set(tenant)),
        tap(() => this.isLoading.set(false))
      )
      .subscribe();
  }

  onClickCurrent() {
    this.tenantService.clickCurrent(this.current());
  }
}

export class MCTenantMenu extends MCComponent {
  constructor(allowNewTenant: boolean = false) {
    super(TenantMenuComponent);
    this.config = {
      allowNewTenant
    };
  }
}
