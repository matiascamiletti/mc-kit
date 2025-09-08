import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MCComponent, MCCoreComponent } from '@mckit/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ImageModule } from 'primeng/image';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
  selector: 'mc-tenant-menu',
  imports: [CommonModule, MenuModule, ButtonModule, ImageModule, SplitButtonModule],
  templateUrl: './tenant-menu.component.html',
  styleUrl: './tenant-menu.component.scss'
})
export class TenantMenuComponent extends MCCoreComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
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
}

export class MCTenantMenu extends MCComponent {
  constructor() {
    super(TenantMenuComponent);
    this.config = {};
  }
}
