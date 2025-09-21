import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MCSubtitle } from '../../../mckit/core/src/public-api';
import { MCImage } from '../../../mckit/core/src/lib/components/image/image.component';
import { MCMenu } from '../../../mckit/core/src/lib/components/menu/menu.component';
import { ItemCustomMenuComponent } from './components/item-custom-menu/item-custom-menu.component';
import { MCSubtitleInTopbar } from '../../../mckit/layout/src/lib/components/subtitle-in-topbar/subtitle-in-topbar.component';
import { MCLoaderService, MCSpinnerFullScreenComponent } from '../../../mckit/loader/src/public-api';
import { MCFooterService, MCSidebarService, MCTopbarService } from '../../../mckit/layout-core/src/public-api';
import { MCAvatar } from '../../../mckit/core/src/lib/components/avatar/avatar.component';
import { DarkModeButton, DarkModeButtonComponent } from './components/dark-mode-button/dark-mode-button.component';
import { MCIconToggleSidebarButton } from '@mckit/layout';
import { MCTenantMenu } from '../../../mckit/tenant/src/lib/components/tenant-menu/tenant-menu.component';
import { MCTenant, MCTenantService } from '../../../mckit/tenant/src/public-api';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MCSpinnerFullScreenComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  footerService = inject(MCFooterService);
  tenantService = inject(MCTenantService);

  constructor(
    protected sidebarService: MCSidebarService,
    protected topbarService: MCTopbarService,
    protected loaderService: MCLoaderService
  ){}

  ngOnInit(): void {
    this.configLoader();
    this.loadTenants();
    this.loadSidebar();
    this.loadTopbar();
    this.loadFooter();
  }

  loadTopbar() {
    this.topbarService.addComponentToLeft(new MCIconToggleSidebarButton());
    //this.topbarService.addComponentToLeft(new MCImage('https://tots.agency/assets/img/logos/logo-horiz-black-color.svg', 150));

    this.topbarService.addComponentToRight(new DarkModeButton());
    this.topbarService.addComponentToRight(new MCAvatar({ label: 'MC', shape: 'circle' }));
  }

  loadSidebar() {
    /**
     * Add component in sidebar one to one
     */
    //this.sidebarService.addComponent(new MCSubtitle('MENU'));

    /**
     * Add components in sidebar all at once
     */
    this.sidebarService.setComponents([
      new MCImage('https://tots.agency/assets/img/logos/logo-horiz-black-color.svg', 150),
      new MCTenantMenu(),
      new MCSubtitle('MENU'),
      { component: ItemCustomMenuComponent, config: { }},
      new MCSubtitle('Inicio'),
      new MCSubtitle('Acerca de '),
      new MCSubtitle('Contacto'),
      new MCMenu([
        { label: 'Item 1', link: '/basic', icon: 'pi pi-times' },
        { label: 'Item 1', link: '/basic', icon: 'pi pi-times' },
        { label: 'Item 2', children: [
          { label: 'Sub Item 1', link: '/basic' },
          { label: 'Sub Item 2', link: '/basic' },
          { label: 'Sub Item 3', link: '/basic' },
        ] }
      ])
    ]);
  }

  loadFooter() {
    this.footerService.addComponent(new MCSubtitle('© 2025 - Todos los derechos reservados'));
  }

  loadTenants() {
    let tenant = new MCTenant();
    tenant.id = '1';
    tenant.name = 'First Tenant';
    tenant.image_url = 'https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg';
    this.tenantService.setCurrent(tenant);
  }

  configLoader() {
    setTimeout(() => {
      this.loaderService.hide();
    }, 3000);
  }
}
