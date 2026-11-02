import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MCSidebarService } from '@mckit/layout-core';
import { BasicLayout } from './basic-layout.component';

describe('BasicLayout', () => {
  let component: BasicLayout;
  let fixture: ComponentFixture<BasicLayout>;
  let sidebarService: MCSidebarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicLayout],
      providers: [provideRouter([])]
    })
    .compileComponents();

    sidebarService = TestBed.inject(MCSidebarService);
    sidebarService.isOpen.set(true);

    fixture = TestBed.createComponent(BasicLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show sidebar when isOpen is true and hide when false', () => {
    sidebarService.isOpen.set(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.sidebar')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.content').classList.contains('content-without-sidebar')).toBeFalse();

    sidebarService.isOpen.set(false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.sidebar')).toBeNull();
    expect(fixture.nativeElement.querySelector('.content').classList.contains('content-without-sidebar')).toBeTrue();
  });

  it('should close sidebar when window width is less than 768 on resize', () => {
    sidebarService.isOpen.set(true);
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(500);

    component.onResize(new Event('resize'));
    expect(sidebarService.isOpen()).toBeFalse();
  });
});
