import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCNavigationService, MCSidebarService } from '@mckit/layout-core';
import { IconToggleSidebarButtonComponent, MCIconToggleSidebarButton } from './icon-toggle-sidebar-button.component';

describe('IconToggleSidebarButtonComponent', () => {
  let component: IconToggleSidebarButtonComponent;
  let fixture: ComponentFixture<IconToggleSidebarButtonComponent>;
  let sidebarService: MCSidebarService;
  let navigationService: MCNavigationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconToggleSidebarButtonComponent]
    })
    .compileComponents();

    sidebarService = TestBed.inject(MCSidebarService);
    navigationService = TestBed.inject(MCNavigationService);
    sidebarService.isOpen.set(true);
    navigationService.isMain.set(true);

    fixture = TestBed.createComponent(IconToggleSidebarButtonComponent);
    component = fixture.componentInstance;
    component.component = new MCIconToggleSidebarButton();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.component.component).toBe(IconToggleSidebarButtonComponent);
  });

  it('should toggle sidebarService.isOpen on onClick()', () => {
    expect(sidebarService.isOpen()).toBeTrue();
    component.onClick();
    expect(sidebarService.isOpen()).toBeFalse();
    component.onClick();
    expect(sidebarService.isOpen()).toBeTrue();
  });

  it('should emit navigationService.onBack when onClickBack() is called', () => {
    let emitted = false;
    navigationService.onBack.subscribe(() => (emitted = true));

    navigationService.isMain.set(false);
    fixture.detectChanges();

    component.onClickBack();
    expect(emitted).toBeTrue();
  });
});
