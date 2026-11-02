import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, provideRouter, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MCSidebarService } from '@mckit/layout-core';
import { MCFuseLayoutComponent } from './fuse-layout.component';

describe('MCFuseLayoutComponent', () => {
  let component: MCFuseLayoutComponent;
  let fixture: ComponentFixture<MCFuseLayoutComponent>;
  let sidebarService: MCSidebarService;
  let routerEvents: Subject<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCFuseLayoutComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    sidebarService = TestBed.inject(MCSidebarService);
    routerEvents = TestBed.inject(Router).events as unknown as Subject<any>;
    fixture = TestBed.createComponent(MCFuseLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close sidebar when closeSidebar() is called', () => {
    sidebarService.isOpen.set(true);
    component.closeSidebar();
    expect(sidebarService.isOpen()).toBeFalse();
  });

  it('should update isRouteLoading on router navigation events', () => {
    expect(component.isRouteLoading()).toBeFalse();

    routerEvents.next(new NavigationStart(1, '/dashboard'));
    expect(component.isRouteLoading()).toBeTrue();

    routerEvents.next(new NavigationEnd(1, '/dashboard', '/dashboard'));
    expect(component.isRouteLoading()).toBeFalse();

    routerEvents.next(new NavigationStart(2, '/settings'));
    expect(component.isRouteLoading()).toBeTrue();
    routerEvents.next(new NavigationCancel(2, '/settings', 'cancelled'));
    expect(component.isRouteLoading()).toBeFalse();

    routerEvents.next(new NavigationStart(3, '/error'));
    expect(component.isRouteLoading()).toBeTrue();
    routerEvents.next(new NavigationError(3, '/error', new Error('failed')));
    expect(component.isRouteLoading()).toBeFalse();
  });
});
