import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { StorageMap } from '@ngx-pwa/local-storage';
import { of } from 'rxjs';
import { MCFilterPanelComponent } from './filter-panel.component';
import { MCFilter } from '../../entities/filter';
import { MCFilterTypePanel } from '../../entities/type-panel';

describe('MCFilterPanelComponent', () => {
  let component: MCFilterPanelComponent;
  let fixture: ComponentFixture<MCFilterPanelComponent>;

  beforeEach(async () => {
    const storageSpy = jasmine.createSpyObj('StorageMap', ['get', 'set', 'delete']);
    storageSpy.get.and.returnValue(of(undefined));
    storageSpy.set.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      imports: [MCFilterPanelComponent],
      providers: [
        provideNoopAnimations(),
        { provide: StorageMap, useValue: storageSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MCFilterPanelComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('config', {
      filters: [MCFilter.text({ title: 'Name', key: 'name' })]
    });
    fixture.detectChanges();
  });

  it('should create and initialize storage with ADVANCED panel when no quick filters', () => {
    expect(component).toBeTruthy();
    expect(component.filterStorage()).toBeDefined();
    expect(component.typePanel()).toBe(MCFilterTypePanel.ADVANCED);
  });

  it('should set BASIC panel when quick filters are present', () => {
    fixture.componentRef.setInput('config', {
      filters: [MCFilter.textQuickFilter({ title: 'Quick', key: 'q', options: [] })]
    });
    component.initStorage();
    expect(component.typePanel()).toBe(MCFilterTypePanel.BASIC);
  });

  it('should emit changes and close dialog or popover based on isMobile', () => {
    const changeSpy = spyOn(component.onChange, 'emit');
    const hideSpy = spyOn(component.overlayPanel(), 'hide');

    component.isMobile.set(false);
    component.emitChanges();
    expect(changeSpy).toHaveBeenCalled();
    expect(hideSpy).toHaveBeenCalled();

    component.isMobile.set(true);
    component.dialogVisible.set(true);
    component.emitChanges();
    expect(component.dialogVisible()).toBeFalse();
  });

  it('should toggle dialog on mobile and overlayPanel on desktop', () => {
    const toggleSpy = spyOn(component.overlayPanel(), 'toggle');

    component.isMobile.set(true);
    component.toggle(new Event('click'));
    expect(component.dialogVisible()).toBeTrue();

    component.isMobile.set(false);
    const ev = new Event('click');
    component.toggle(ev);
    expect(toggleSpy).toHaveBeenCalledWith(ev);
  });

  it('should handle window resize', () => {
    const checkSpy = spyOn(component, 'checkScreenSize').and.callThrough();
    component.onResize(new Event('resize'));
    expect(checkSpy).toHaveBeenCalled();
  });
});
