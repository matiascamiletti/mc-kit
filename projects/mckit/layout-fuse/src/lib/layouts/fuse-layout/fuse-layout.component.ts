import { CommonModule } from '@angular/common';
import { afterNextRender, Component, inject, signal, Signal } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterModule } from '@angular/router';
import { PrintServiceComponent } from '@mckit/core';
import { ID_FOOTER_MC_COMPONENT, ID_SIDEBAR_MC_COMPONENT, ID_TOPBAR_MC_COMPONENT, MCSidebarService } from '@mckit/layout-core';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'mc-fuse-layout',
  imports: [CommonModule, RouterModule, PrintServiceComponent, ButtonModule, ProgressSpinnerModule],
  templateUrl: './fuse-layout.component.html',
  styleUrl: './fuse-layout.component.scss'
})
export class MCFuseLayoutComponent {

  router: Router = inject(Router);
  sidebarService: MCSidebarService = inject(MCSidebarService);

  sidebarId = ID_SIDEBAR_MC_COMPONENT;
  topbarLeftId = ID_TOPBAR_MC_COMPONENT + '_left';
  topbarRightId = ID_TOPBAR_MC_COMPONENT + '_right';
  footerId = ID_FOOTER_MC_COMPONENT;

  isOpen = this.sidebarService.isOpen;
  isRouteLoading = signal<boolean>(false);

  constructor() {
    afterNextRender(() => this.initSidebar());

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isRouteLoading.set(true);
      }

      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.isRouteLoading.set(false);
      }
    });
  }

  initSidebar() {
    if (this.verifyIfMobile()) {
      this.sidebarService.isOpen.set(false);
    }
  }

  verifyIfMobile() {
    return window.innerWidth < 768;
  }

  closeSidebar() {
    this.sidebarService.isOpen.set(false);
  }
}
