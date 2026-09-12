import { afterNextRender, Component, HostListener, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Event as RouterEvent,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterModule,
} from '@angular/router';
import { PrintServiceComponent } from '@mckit/core';
import {
  ID_FOOTER_MC_COMPONENT,
  ID_SIDEBAR_MC_COMPONENT,
  ID_TOPBAR_MC_COMPONENT,
  MCSidebarService,
} from '@mckit/layout-core';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

/**
 * Viewport width (px) under which the sidebar behaves as an overlay drawer
 * instead of a fixed column. Matches Tailwind's `md` breakpoint.
 */
export const MC_AXIS_MOBILE_BREAKPOINT = 768;

/**
 * Axis layout: dark navigation sidebar, white topbar with left / center / right
 * slots and a light content area.
 *
 * It follows the same structure as `MCFuseLayoutComponent`, so every MCKit
 * component registered through `MCSidebarService`, `MCTopbarService` and
 * `MCFooterService` keeps working without changes.
 */
@Component({
  selector: 'mc-axis-layout',
  imports: [RouterModule, PrintServiceComponent, ButtonModule, ProgressSpinnerModule],
  templateUrl: './axis-layout.component.html',
  styleUrl: './axis-layout.component.scss',
})
export class MCAxisLayoutComponent {
  router: Router = inject(Router);
  sidebarService: MCSidebarService = inject(MCSidebarService);

  sidebarId = ID_SIDEBAR_MC_COMPONENT;
  topbarLeftId = ID_TOPBAR_MC_COMPONENT + '_left';
  topbarCenterId = ID_TOPBAR_MC_COMPONENT + '_center';
  topbarRightId = ID_TOPBAR_MC_COMPONENT + '_right';
  footerId = ID_FOOTER_MC_COMPONENT;

  isOpen = this.sidebarService.isOpen;
  isRouteLoading = signal<boolean>(false);
  isMobile = signal<boolean>(false);

  constructor() {
    afterNextRender(() => this.initSidebar());

    this.router.events
      .pipe(takeUntilDestroyed())
      .subscribe((event) => this.onRouterEvent(event));
  }

  @HostListener('window:resize')
  onResize(): void {
    const wasMobile = this.isMobile();
    const isMobileNow = this.verifyIfMobile();
    this.isMobile.set(isMobileNow);

    if (isMobileNow && !wasMobile) {
      this.closeSidebar();
    }
  }

  initSidebar(): void {
    this.isMobile.set(this.verifyIfMobile());

    if (this.isMobile()) {
      this.closeSidebar();
    }
  }

  verifyIfMobile(): boolean {
    return typeof window !== 'undefined' && window.innerWidth < MC_AXIS_MOBILE_BREAKPOINT;
  }

  closeSidebar(): void {
    this.sidebarService.isOpen.set(false);
  }

  toggleSidebar(): void {
    this.sidebarService.isOpen.update((isOpen) => !isOpen);
  }

  protected onRouterEvent(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.isRouteLoading.set(true);
      return;
    }

    if (
      event instanceof NavigationEnd ||
      event instanceof NavigationCancel ||
      event instanceof NavigationError
    ) {
      this.isRouteLoading.set(false);
    }
  }
}
