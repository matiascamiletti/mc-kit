import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { McComponentService, MCSubtitle } from '@mckit/core';
import { ID_SIDEBAR_MC_COMPONENT, MCSidebarService } from './sidebar.service';
import { ID_FOOTER_MC_COMPONENT, MCFooterService } from './footer.service';
import { ID_TOPBAR_MC_COMPONENT, MCTopbarService } from './topbar.service';
import { MCNavigationService } from './navigation.service';
import { MCBaseBackPage } from '../pages/base-back-page';

@Component({
  selector: 'test-back-page',
  standalone: true,
  template: ''
})
class ConcreteBackPageComponent extends MCBaseBackPage {
  onBackRoute = '/previous';
}

describe('Layout Core Services and Base Back Page', () => {
  let sidebarService: MCSidebarService;
  let footerService: MCFooterService;
  let topbarService: MCTopbarService;
  let navigationService: MCNavigationService;
  let componentService: McComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConcreteBackPageComponent],
      providers: [provideRouter([])]
    });
    sidebarService = TestBed.inject(MCSidebarService);
    footerService = TestBed.inject(MCFooterService);
    topbarService = TestBed.inject(MCTopbarService);
    navigationService = TestBed.inject(MCNavigationService);
    componentService = TestBed.inject(McComponentService);
    componentService.clear();
  });

  describe('MCSidebarService', () => {
    it('should be created with isOpen true by default', () => {
      expect(sidebarService).toBeTruthy();
      expect(sidebarService.isOpen()).toBeTrue();
    });

    it('should add, get, and set sidebar components', () => {
      const comp1 = new MCSubtitle('Sidebar 1');
      const comp2 = new MCSubtitle('Sidebar 2');

      sidebarService.addComponent(comp1);
      expect(sidebarService.getComponents()).toEqual([comp1]);
      expect(componentService.getComponents(ID_SIDEBAR_MC_COMPONENT)).toEqual([comp1]);

      sidebarService.setComponents([comp2]);
      expect(sidebarService.getComponents()).toEqual([comp2]);
    });
  });

  describe('MCFooterService', () => {
    it('should add, get, and set footer components', () => {
      const comp1 = new MCSubtitle('Footer 1');
      const comp2 = new MCSubtitle('Footer 2');

      footerService.addComponent(comp1);
      expect(footerService.getComponents()).toEqual([comp1]);
      expect(componentService.getComponents(ID_FOOTER_MC_COMPONENT)).toEqual([comp1]);

      footerService.setComponents([comp2]);
      expect(footerService.getComponents()).toEqual([comp2]);
    });
  });

  describe('MCTopbarService', () => {
    it('should manage subtitle signal and left, center, right components', () => {
      expect(topbarService.subtitle()).toBe('');
      topbarService.subtitle.set('New Subtitle');
      expect(topbarService.subtitle()).toBe('New Subtitle');

      const leftComp = new MCSubtitle('Left');
      const centerComp = new MCSubtitle('Center');
      const rightComp = new MCSubtitle('Right');

      topbarService.addComponentToLeft(leftComp);
      expect(topbarService.getComponentsInLeft()).toEqual([leftComp]);
      expect(componentService.getComponents(ID_TOPBAR_MC_COMPONENT + '_left')).toEqual([leftComp]);
      topbarService.setComponentsInLeft([]);
      expect(topbarService.getComponentsInLeft()).toEqual([]);

      topbarService.addComponentToCenter(centerComp);
      expect(topbarService.getComponentsInCenter()).toEqual([centerComp]);
      topbarService.setComponentsInCenter([]);
      expect(topbarService.getComponentsInCenter()).toEqual([]);

      topbarService.addComponentToRight(rightComp);
      expect(topbarService.getComponentsInRight()).toEqual([rightComp]);
      topbarService.setComponentsInRight([]);
      expect(topbarService.getComponentsInRight()).toEqual([]);
    });
  });

  describe('MCNavigationService and MCBaseBackPage', () => {
    it('should set isMain to false on init and navigate to onBackRoute when onBack emits', () => {
      const router = TestBed.inject(Router);
      const navSpy = spyOn(router, 'navigateByUrl');

      const fixture = TestBed.createComponent(ConcreteBackPageComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();

      expect(navigationService.isMain()).toBeFalse();

      navigationService.onBack.next();
      expect(navSpy).toHaveBeenCalledWith('/previous');
      expect(navigationService.isMain()).toBeTrue();

      component.onBackSubscription = navigationService.onBack.subscribe();
      const unsubSpy = spyOn(component.onBackSubscription, 'unsubscribe');
      component.ngOnDestroy();
      expect(unsubSpy).toHaveBeenCalled();
    });
  });
});
