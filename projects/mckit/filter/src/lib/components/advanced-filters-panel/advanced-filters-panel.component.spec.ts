import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { StorageMap } from '@ngx-pwa/local-storage';
import { of } from 'rxjs';
import { AdvancedFiltersPanelComponent } from './advanced-filters-panel.component';
import { MCFilterStore } from '../../stores/filter.store';
import { MCFilter } from '../../entities/filter';
import { MCFilterNavigationService } from '../../services/filter-navigation.service';
import { MCFilterTypePanel } from '../../entities/type-panel';

describe('AdvancedFiltersPanelComponent', () => {
  let component: AdvancedFiltersPanelComponent;
  let fixture: ComponentFixture<AdvancedFiltersPanelComponent>;
  let store: MCFilterStore;
  let navService: MCFilterNavigationService;

  beforeEach(async () => {
    const storageSpy = jasmine.createSpyObj('StorageMap', ['get', 'set', 'delete']);
    storageSpy.get.and.returnValue(of(undefined));
    storageSpy.set.and.returnValue(of(undefined));

    store = new MCFilterStore(undefined, storageSpy, [
      MCFilter.text({ title: 'Name', key: 'name' }),
      MCFilter.textQuickFilter({ title: 'Quick', key: 'quick', options: [] })
    ]);

    await TestBed.configureTestingModule({
      imports: [AdvancedFiltersPanelComponent],
      providers: [provideNoopAnimations()]
    }).compileComponents();

    navService = TestBed.inject(MCFilterNavigationService);
    fixture = TestBed.createComponent(AdvancedFiltersPanelComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('filterStorage', store);
    fixture.detectChanges();
  });

  it('should create and load storage filters', () => {
    expect(component).toBeTruthy();
    expect(component.filters().length).toBe(2);
    expect(component.hasQuickFilters()).toBeTrue();
  });

  it('should add filter, add group, and remove filter', () => {
    component.clickAddFilter();
    expect(component.results().length).toBe(1);

    component.clickAddGroup();
    expect(component.results().length).toBe(2);
    expect(component.results()[1].childrens?.length).toBe(1);

    component.clickRemoveFilter(0);
    expect(component.results().length).toBe(1);
  });

  it('should apply filters, clear all, and switch to quick filters', () => {
    const applySpy = spyOn(store, 'emitApply').and.callThrough();
    const cleanSpy = spyOn(store, 'cleanResults').and.callThrough();

    component.clickApply();
    expect(applySpy).toHaveBeenCalled();

    component.clickClearAll();
    expect(cleanSpy).toHaveBeenCalled();

    navService.setAdvancedPanel();
    component.clickSwitchToQuick();
    expect(navService.getTypePanel()).toBe(MCFilterTypePanel.BASIC);
  });
});
