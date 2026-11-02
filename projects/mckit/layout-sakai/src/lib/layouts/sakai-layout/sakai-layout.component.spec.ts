import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MCSidebarService } from '@mckit/layout-core';
import { MCSakaiLayoutComponent } from './sakai-layout.component';

describe('MCSakaiLayoutComponent', () => {
  let component: MCSakaiLayoutComponent;
  let fixture: ComponentFixture<MCSakaiLayoutComponent>;
  let sidebarService: MCSidebarService;
  let routeDataSubject: BehaviorSubject<Record<string, any>>;

  beforeEach(async () => {
    routeDataSubject = new BehaviorSubject<Record<string, any>>({});

    await TestBed.configureTestingModule({
      imports: [MCSakaiLayoutComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            data: routeDataSubject.asObservable(),
          },
        },
      ],
    }).compileComponents();

    sidebarService = TestBed.inject(MCSidebarService);
    fixture = TestBed.createComponent(MCSakaiLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with default styles', () => {
    expect(component).toBeTruthy();
    expect(component.layoutBg).toBe('var(--mc-layout-bg)');
    expect(component.topbarBg).toBe('var(--mc-topbar-bg)');
    expect(component.sidebarBg).toBe('var(--mc-sidebar-bg)');
  });

  it('should merge styles from route data and @Input styles', () => {
    component.styles = { topbarHeight: '72px' };
    routeDataSubject.next({
      styles: {
        layoutBg: '#f8fafc',
        topbarHeight: '64px',
      },
    });

    expect(component.layoutBg).toBe('#f8fafc');
    expect(component.topbarHeight).toBe('72px');
  });

  it('should open and close sidebar via MCSidebarService', () => {
    component.closeSidebar();
    expect(sidebarService.isOpen()).toBeFalse();

    component.openSidebar();
    expect(sidebarService.isOpen()).toBeTrue();
  });

  it('should close sidebar in initSidebar when not on desktop', () => {
    sidebarService.isOpen.set(true);
    component.isDesktop = false;
    component.initSidebar();
    expect(sidebarService.isOpen()).toBeFalse();
  });
});
