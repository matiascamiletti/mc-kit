import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { StorageMap } from '@ngx-pwa/local-storage';
import { of, throwError } from 'rxjs';
import { ItemAdvancedFilterComponent } from './item-advanced-filter.component';
import { MCFilterStore } from '../../stores/filter.store';
import { MCFilter, MCTypeFilter } from '../../entities/filter';
import { MCConditionResult, MCResultFilter } from '../../entities/result';

describe('ItemAdvancedFilterComponent', () => {
  let component: ItemAdvancedFilterComponent;
  let fixture: ComponentFixture<ItemAdvancedFilterComponent>;
  let store: MCFilterStore;
  let result: MCResultFilter;

  beforeEach(async () => {
    const storageSpy = jasmine.createSpyObj('StorageMap', ['get', 'set', 'delete']);
    storageSpy.get.and.returnValue(of(undefined));
    storageSpy.set.and.returnValue(of(undefined));

    const textFilter = MCFilter.text({ title: 'Name', key: 'name' });
    store = new MCFilterStore(undefined, storageSpy, [textFilter]);
    result = new MCResultFilter();
    result.filter = textFilter;

    await TestBed.configureTestingModule({
      imports: [ItemAdvancedFilterComponent],
      providers: [provideNoopAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemAdvancedFilterComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('filterStorage', store);
    fixture.componentRef.setInput('result', result);
    fixture.componentRef.setInput('isFirst', true);
    fixture.componentRef.setInput('isChildren', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear result value on onChangeFilter', () => {
    result.value = 'abc';
    component.onChangeFilter();
    expect(result.value).toBeUndefined();
  });

  it('should add child filter and emit update on clickAddFilter', () => {
    const updateSpy = spyOn(store, 'emitUpdate');
    component.clickAddFilter();
    expect(result.childrens?.length).toBe(1);
    expect(updateSpy).toHaveBeenCalled();
  });

  it('should remove filter from main or children depending on isChildren', () => {
    const removeMainSpy = spyOn(store, 'removeResultMain');
    const removeChildSpy = spyOn(store, 'removeResultInChildrenMain');

    fixture.componentRef.setInput('isChildren', false);
    component.clickRemoveFilter();
    expect(removeMainSpy).toHaveBeenCalledWith(result);

    fixture.componentRef.setInput('isChildren', true);
    component.clickRemoveFilter();
    expect(removeChildSpy).toHaveBeenCalledWith(result);
  });

  it('should refresh column for multiselect and multiselect autocomplete', () => {
    const multiFilter = MCFilter.multiselectAutocomplete({
      title: 'Users',
      key: 'users',
      filter: () => of([])
    });
    multiFilter.isShowConditions = false;
    result.filter = multiFilter;
    result.value = [1];

    component.onRefreshColumn();
    expect(result.condition).toBe(MCConditionResult.IN);
    expect(result.value).toEqual([]);
    expect(result.selectedOptions).toEqual([]);
  });

  it('should filter autocomplete for AUTOCOMPLETE and MULTISELECT_AUTOCOMPLETE', () => {
    const autoFilter = MCFilter.autocomplete({
      title: 'Tag',
      key: 'tag',
      filter: () => of([{ label: 'Zebra', value: 'z' }, { label: 'Alpha', value: 'a' }])
    });
    result.filter = autoFilter;

    component.onFilterAutocomplete({ query: 'a', originalEvent: new Event('input') });
    expect(component.filteredOptions.map((o) => o.label)).toEqual(['Alpha', 'Zebra']);

    const multiAuto = MCFilter.multiselectAutocomplete({
      title: 'Tags',
      key: 'tags',
      filter: () => of([{ label: 'Beta', value: 2 }])
    });
    result.filter = multiAuto;
    result.value = [1];
    component.availableOptions = [{ label: 'Alpha', value: 1 }];

    component.onFilterAutocomplete({ filter: 'b', originalEvent: new Event('input') });
    expect(component.filteredOptions.length).toBe(2);

    const errAuto = MCFilter.autocomplete({
      title: 'Err',
      key: 'err',
      filter: () => throwError(() => new Error('Network error'))
    });
    result.filter = errAuto;
    component.onFilterAutocomplete({ query: 'x', originalEvent: new Event('input') });
    expect(component.isLoading).toBeFalse();
  });

  it('should group options into Selected and Available', () => {
    const options = [
      { label: 'Banana', value: 2 },
      { label: 'Apple', value: 1 },
      { label: 'Cherry', value: 3 }
    ];
    const groups = component.getGroupedOptions(options, [2]);
    expect(groups.length).toBe(2);
    expect(groups[0].label).toBe('Selected');
    expect(groups[0].items.map((i) => i.label)).toEqual(['Banana']);
    expect(groups[1].label).toBe('Available');
    expect(groups[1].items.map((i) => i.label)).toEqual(['Apple', 'Cherry']);
    expect(component.getGroupedOptions([], [])).toEqual([]);
  });

  it('should handle onMultiselectChange, onShowDropdown, and truncatePlaceholder', () => {
    const multiAuto = MCFilter.multiselectAutocomplete({
      title: 'Tags',
      key: 'tags',
      filter: () => of([])
    });
    result.filter = multiAuto;
    component.availableOptions = [{ label: 'One', value: 1 }];

    component.onMultiselectChange({ value: [1, 2] });
    expect(result.selectedOptions?.length).toBe(2);

    component.onShowDropdown();
    expect(component.filteredOptions.length).toBe(2);

    expect(component.truncatePlaceholder(undefined)).toBe('');
    expect(component.truncatePlaceholder('Short')).toBe('Short');
    expect(component.truncatePlaceholder('This is a very long placeholder string')).toBe('This is a very long ...');
  });
});
