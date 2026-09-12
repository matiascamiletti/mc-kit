import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  Event as RouterEvent,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  provideRouter,
  Router,
} from '@angular/router';
import { Subject } from 'rxjs';
import { PrintServiceComponent } from '@mckit/core';
import {
  ID_FOOTER_MC_COMPONENT,
  ID_SIDEBAR_MC_COMPONENT,
  ID_TOPBAR_MC_COMPONENT,
  MCSidebarService,
} from '@mckit/layout-core';

import { MC_AXIS_MOBILE_BREAKPOINT, MCAxisLayoutComponent } from './axis-layout.component';

const DESKTOP_WIDTH = MC_AXIS_MOBILE_BREAKPOINT + 512;
const MOBILE_WIDTH = MC_AXIS_MOBILE_BREAKPOINT - 288;

function setViewportWidth(width: number): void {
  Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: width });
}

describe('MCAxisLayoutComponent', () => {
  let fixture: ComponentFixture<MCAxisLayoutComponent>;
  let component: MCAxisLayoutComponent;
  let sidebarService: MCSidebarService;
  let routerEvents: Subject<RouterEvent>;

  async function createComponent(): Promise<void> {
    await TestBed.configureTestingModule({
      imports: [MCAxisLayoutComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    sidebarService = TestBed.inject(MCSidebarService);
    routerEvents = TestBed.inject(Router).events as unknown as Subject<RouterEvent>;

    fixture = TestBed.createComponent(MCAxisLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  }

  function printServiceIds(): string[] {
    return fixture.debugElement
      .queryAll(By.directive(PrintServiceComponent))
      .map((debugElement) => (debugElement.componentInstance as PrintServiceComponent).id);
  }

  function sidebarElement(): HTMLElement {
    return fixture.nativeElement.querySelector('.layout-sidebar');
  }

  beforeEach(() => setViewportWidth(DESKTOP_WIDTH));

  describe('on desktop', () => {
    beforeEach(async () => createComponent());

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render the same MCKit slots as the Fuse layout plus the topbar center slot', () => {
      const ids = printServiceIds();

      expect(ids).toContain(ID_SIDEBAR_MC_COMPONENT);
      expect(ids).toContain(ID_TOPBAR_MC_COMPONENT + '_left');
      expect(ids).toContain(ID_TOPBAR_MC_COMPONENT + '_center');
      expect(ids).toContain(ID_TOPBAR_MC_COMPONENT + '_right');
      expect(ids).toContain(ID_FOOTER_MC_COMPONENT);
      expect(ids).toHaveLength(5);
    });

    it('should render a router outlet for the child pages', () => {
      expect(fixture.nativeElement.querySelector('router-outlet')).not.toBeNull();
    });

    it('should keep the sidebar open and share the state with MCSidebarService', () => {
      expect(component.isOpen).toBe(sidebarService.isOpen);
      expect(component.isOpen()).toBe(true);
      expect(sidebarElement().classList.contains('open')).toBe(true);
    });

    it('should not render the mobile overlay when the sidebar is closed', async () => {
      component.closeSidebar();
      await fixture.whenStable();

      expect(sidebarService.isOpen()).toBe(false);
      expect(sidebarElement().classList.contains('open')).toBe(false);
      expect(fixture.nativeElement.querySelector('.layout-sidebar-overlay')).toBeNull();
    });

    it('should render the mobile overlay while the sidebar is open', () => {
      expect(fixture.nativeElement.querySelector('.layout-sidebar-overlay')).not.toBeNull();
    });

    it('should close the sidebar when the overlay is clicked', async () => {
      const overlay: HTMLElement = fixture.nativeElement.querySelector('.layout-sidebar-overlay');
      overlay.click();
      await fixture.whenStable();

      expect(sidebarService.isOpen()).toBe(false);
    });

    it('should toggle the sidebar', () => {
      component.toggleSidebar();
      expect(sidebarService.isOpen()).toBe(false);

      component.toggleSidebar();
      expect(sidebarService.isOpen()).toBe(true);
    });

    it('should show the route loading overlay only between NavigationStart and NavigationEnd', async () => {
      expect(component.isRouteLoading()).toBe(false);
      expect(fixture.nativeElement.querySelector('.route-loading-overlay')).toBeNull();

      routerEvents.next(new NavigationStart(1, '/axis'));
      await fixture.whenStable();
      expect(component.isRouteLoading()).toBe(true);
      expect(fixture.nativeElement.querySelector('.route-loading-overlay')).not.toBeNull();

      routerEvents.next(new NavigationEnd(1, '/axis', '/axis'));
      await fixture.whenStable();
      expect(component.isRouteLoading()).toBe(false);
      expect(fixture.nativeElement.querySelector('.route-loading-overlay')).toBeNull();
    });

    it('should hide the route loading overlay when the navigation is cancelled', () => {
      routerEvents.next(new NavigationStart(2, '/axis'));
      routerEvents.next(new NavigationCancel(2, '/axis', 'guard rejected'));

      expect(component.isRouteLoading()).toBe(false);
    });

    it('should hide the route loading overlay when the navigation fails', () => {
      routerEvents.next(new NavigationStart(3, '/axis'));
      routerEvents.next(new NavigationError(3, '/axis', new Error('boom')));

      expect(component.isRouteLoading()).toBe(false);
    });

    it('should stop listening to router events once destroyed', () => {
      fixture.destroy();

      routerEvents.next(new NavigationStart(4, '/axis'));

      expect(component.isRouteLoading()).toBe(false);
    });

    it('should close the sidebar when the viewport shrinks to mobile', () => {
      setViewportWidth(MOBILE_WIDTH);
      window.dispatchEvent(new Event('resize'));

      expect(sidebarService.isOpen()).toBe(false);
    });

    it('should not close an open drawer on mobile resizes that stay mobile', () => {
      setViewportWidth(MOBILE_WIDTH);
      window.dispatchEvent(new Event('resize'));
      sidebarService.isOpen.set(true);

      setViewportWidth(MOBILE_WIDTH - 40);
      window.dispatchEvent(new Event('resize'));

      expect(sidebarService.isOpen()).toBe(true);
    });
  });

  describe('on mobile', () => {
    beforeEach(async () => {
      setViewportWidth(MOBILE_WIDTH);
      await createComponent();
    });

    it('should start with the sidebar closed', () => {
      expect(sidebarService.isOpen()).toBe(false);
      expect(sidebarElement().classList.contains('open')).toBe(false);
    });

    it('should close the drawer from the close button', async () => {
      sidebarService.isOpen.set(true);
      await fixture.whenStable();

      const closeButton: HTMLElement = fixture.nativeElement.querySelector('.layout-sidebar-close-button button');
      closeButton.click();
      await fixture.whenStable();

      expect(sidebarService.isOpen()).toBe(false);
    });
  });
});
