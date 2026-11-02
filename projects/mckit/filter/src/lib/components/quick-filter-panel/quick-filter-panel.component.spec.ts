import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { StorageMap } from '@ngx-pwa/local-storage';
import { of } from 'rxjs';
import { QuickFilterPanelComponent } from './quick-filter-panel.component';
import { MCFilterStore } from '../../stores/filter.store';
import { MCFilter } from '../../entities/filter';
import { MCFilterNavigationService } from '../../services/filter-navigation.service';
import { MCFilterTypePanel } from '../../entities/type-panel';

describe('QuickFilterPanelComponent', () => {
  let component: QuickFilterPanelComponent;
  let fixture: ComponentFixture<QuickFilterPanelComponent>;
  let store: MCFilterStore;
  let navService: MCFilterNavigationService;
  let quickFilter: MCFilter;

  beforeEach(async () => {
    const storageSpy = jasmine.createSpyObj('StorageMap', ['get', 'set', 'delete']);
    storageSpy.get.and.returnValue(of(undefined));
    storageSpy.set.and.returnValue(of(undefined));

    quickFilter = MCFilter.selectQuickFilter({
      title: 'Status',
      key: 'status',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Closed', value: 'closed' }
      ]
    });
    store = new MCFilterStore(undefined, storageSpy, [quickFilter]);

    await TestBed.configureTestingModule({
      imports: [QuickFilterPanelComponent],
      providers: [provideNoopAnimations()]
    }).compileComponents();

    navService = TestBed.inject(MCFilterNavigationService);
    fixture = TestBed.createComponent(QuickFilterPanelComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('filterStorage', store);
    fixture.detectChanges();
  });

  it('should create and load quick filters', () => {
    expect(component).toBeTruthy();
    expect(component.quickFilters().length).toBe(1);
  });

  it('should select item, replace existing selection, and check isItemSelected', () => {
    const item1 = { label: 'Active', value: 'active' };
    const item2 = { label: 'Closed', value: 'closed' };

    expect(component.isItemSelected(quickFilter, item1)).toBeFalse();

    component.clickItem(quickFilter, item1);
    expect(component.isItemSelected(quickFilter, item1)).toBeTrue();

    component.clickItem(quickFilter, item2);
    expect(component.isItemSelected(quickFilter, item1)).toBeFalse();
    expect(component.isItemSelected(quickFilter, item2)).toBeTrue();
  });

  it('should clear all and switch to advanced filters', () => {
    component.clickItem(quickFilter, { label: 'Active', value: 'active' });
    expect(component.results().length).toBe(1);

    component.clickClearAll();
    expect(component.results().length).toBe(0);

    component.clickSwitchToAdvanced();
    expect(navService.getTypePanel()).toBe(MCFilterTypePanel.ADVANCED);
  });
});
