import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MCFilterOdataConverterService } from './filter-odata-converter.service';
import { MCFilterNavigationService } from './filter-navigation.service';
import { MCConditionResult, MCResultFilter } from '../entities/result';
import { MCFilter, MCTypeFilter } from '../entities/filter';
import { MCFilterTypePanel } from '../entities/type-panel';
import { FilterStore, MCFilterStore } from '../stores/filter.store';

describe('MCFilterOdataConverterService', () => {
  let service: MCFilterOdataConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MCFilterOdataConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert EQUALS, CONTAINS, and IN conditions to OData string', () => {
    const f1 = new MCResultFilter();
    f1.filter = MCFilter.text({ title: 'Name', key: 'name' });
    f1.condition = MCConditionResult.EQUALS;
    f1.value = 'John';

    const f2 = new MCResultFilter();
    f2.operator = 'and';
    f2.filter = MCFilter.text({ title: 'Bio', key: 'bio' });
    f2.condition = MCConditionResult.CONTAINS;
    f2.value = 'dev';

    const f3 = new MCResultFilter();
    f3.operator = 'or';
    f3.filter = MCFilter.multiselect({ title: 'Status', key: 'status', options: [] });
    f3.condition = MCConditionResult.IN;
    f3.value = [1, 'active'];

    const res = service.convert([f1, f2, f3]);
    expect(res).toBe("name eq 'John' and contains(bio, 'dev') or status in (1,'active')");
  });

  it('should handle nested children groups and edge cases', () => {
    const child1 = new MCResultFilter();
    child1.filter = MCFilter.text({ title: 'City', key: 'city' });
    child1.condition = MCConditionResult.EQUALS;
    child1.value = 'NY';

    const child2 = new MCResultFilter();
    child2.operator = 'or';
    child2.filter = MCFilter.text({ title: 'City', key: 'city' });
    child2.condition = MCConditionResult.EQUALS;
    child2.value = 'LA';

    const group = new MCResultFilter();
    group.childrens = [child1, child2];

    const secondGroup = new MCResultFilter();
    secondGroup.operator = 'and';
    secondGroup.childrens = [child1];

    expect(service.convert([group, secondGroup])).toBe("(city eq 'NY' or city eq 'LA') and (city eq 'NY')");

    const emptyCond = new MCResultFilter();
    emptyCond.condition = undefined;
    expect(service.mapFilterToOData(emptyCond)).toBe('');

    const unsupportedCond = new MCResultFilter();
    unsupportedCond.filter = MCFilter.text({ title: 'Age', key: 'age' });
    unsupportedCond.condition = MCConditionResult.GREATER_THAN;
    expect(service.mapFilterToOData(unsupportedCond)).toBe('');
  });
});

describe('MCFilter, MCResultFilter, MCFilterNavigationService & MCFilterStore', () => {
  let storageSpy: jasmine.SpyObj<StorageMap>;

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('StorageMap', ['get', 'set', 'delete']);
    storageSpy.get.and.returnValue(of(undefined));
    storageSpy.set.and.returnValue(of(undefined));
  });

  it('should create all filter types via MCFilter static methods', () => {
    const obsFn = () => of([{ label: 'A', value: 1 }]);
    expect(MCFilter.text({ title: 'T', key: 'k' }).type).toBe(MCTypeFilter.TEXT);
    expect(MCFilter.select({ title: 'S', key: 's', options: [] }).type).toBe(MCTypeFilter.SELECT);
    expect(MCFilter.autocomplete({ title: 'A', key: 'a', filter: obsFn }).type).toBe(MCTypeFilter.AUTOCOMPLETE);
    expect(MCFilter.textQuickFilter({ title: 'TQ', key: 'tq', options: [] }).isQuickFilter).toBeTrue();
    expect(MCFilter.selectQuickFilter({ title: 'SQ', key: 'sq', options: [] }).isQuickFilter).toBeTrue();
    expect(MCFilter.autocompleteQuickFilter({ title: 'AQ', key: 'aq', filter: obsFn }).isQuickFilter).toBeTrue();
    expect(MCFilter.multiselect({ title: 'M', key: 'm', options: [], maxSelectedLabels: 2 }).maxSelectedLabels).toBe(2);
    expect(MCFilter.multiselectQuickFilter({ title: 'MQ', key: 'mq', options: [] }).isQuickFilter).toBeTrue();
    expect(MCFilter.multiselectAutocomplete({ title: 'MA', key: 'ma', filter: obsFn }).type).toBe(MCTypeFilter.MULTISELECT_AUTOCOMPLETE);
    expect(MCFilter.multiselectAutocompleteQuickFilter({ title: 'MAQ', key: 'maq', filter: obsFn }).isQuickFilter).toBeTrue();
  });

  it('should validate MCResultFilter and return operators/conditions', () => {
    const valid = new MCResultFilter();
    valid.filter = MCFilter.text({ title: 'Name', key: 'name' });
    valid.value = 'test';
    expect(MCResultFilter.isValid(valid)).toBeTrue();

    const invalid = new MCResultFilter();
    expect(MCResultFilter.isValid(invalid)).toBeFalse();

    const parent = new MCResultFilter();
    parent.childrens = [valid];
    expect(MCResultFilter.isValid(parent)).toBeTrue();

    expect(MCResultFilter.getOperators().length).toBe(2);
    expect(MCResultFilter.getConditions().length).toBe(2);
  });

  it('should navigate panels in MCFilterNavigationService', () => {
    const nav = new MCFilterNavigationService();
    expect(nav.getTypePanel()).toBe(MCFilterTypePanel.BASIC);
    nav.setAdvancedPanel();
    expect(nav.getTypePanel()).toBe(MCFilterTypePanel.ADVANCED);
    nav.setBasicPanel();
    expect(nav.getTypePanel()).toBe(MCFilterTypePanel.BASIC);
  });

  it('should manage results and persistence in MCFilterStore', () => {
    const f1 = MCFilter.textQuickFilter({ title: 'Status', key: 'status', options: [{ label: 'Open', value: 'open' }] });
    const f2 = MCFilter.text({ title: 'Search', key: 'search' });

    const savedData = JSON.stringify([{ operator: 'and', filter: { key: 'status', type: MCTypeFilter.TEXT }, value: 'open' }]);
    storageSpy.get.and.returnValue(of(savedData));

    const store = new MCFilterStore('my_key', storageSpy, [f1, f2]);
    expect(store.getStorageKey()).toBe('mc_filter_my_key');
    expect(store.hasQuickFilters()).toBeTrue();
    expect(store.getResults().length).toBe(1);
    expect(store.getResultByFilter(f1)?.value).toBe('open');
    expect(store.getResultsByFilter(f1).length).toBe(1);

    store.addResultByFilter(f2, 'hello', true);
    expect(store.getResults().length).toBe(2);
    expect(storageSpy.set).toHaveBeenCalled();

    store.removeResultByFilterAndValue(f2, 'hello', true);
    expect(store.getResults().length).toBe(1);

    store.removeResultByIndex(0, true);
    expect(store.getResults().length).toBe(0);

    const child = new MCResultFilter();
    child.filter = f2;
    child.value = 'nested';
    const group = new MCResultFilter();
    group.childrens = [child];
    store.addResult(group);
    store.removeResultInChildrenMain(child);
    expect(group.childrens.length).toBe(0);

    store.cleanResults();
    expect(store.getResults().length).toBe(0);

    store.setStorageKey('');
    expect(store.getStorageKey()).toBeUndefined();
  });

  it('should reconstruct filters in FilterStore', () => {
    const filterStore = new FilterStore();
    const configFilters = [
      MCFilter.text({ title: 'Name', key: 'name' }),
      MCFilter.multiselect({ title: 'Tags', key: 'tags', options: [] }),
      MCFilter.multiselectAutocomplete({ title: 'Users', key: 'users', filter: () => of([]) })
    ];
    const saved: MCResultFilter[] = [
      { operator: 'and', filter: { key: 'name', type: MCTypeFilter.TEXT } as any, value: 'Alice' },
      { operator: 'and', filter: { key: 'tags', type: MCTypeFilter.MULTISELECT } as any, value: 'tag1' },
      { operator: 'and', filter: { key: 'users', type: MCTypeFilter.MULTISELECT_AUTOCOMPLETE } as any, value: [10] },
      { operator: 'or', filter: { key: 'unknown', type: MCTypeFilter.TEXT } as any, value: 'x' }
    ];

    const reconstructed = (filterStore as any).reconstructFilters(saved, configFilters);
    expect(reconstructed.length).toBe(4);
    expect(reconstructed[0].condition).toBe(MCConditionResult.EQUALS);
    expect(reconstructed[1].condition).toBe(MCConditionResult.IN);
    expect(reconstructed[1].value).toEqual(['tag1']);
    expect(reconstructed[2].selectedOptions).toEqual([{ label: '10', value: 10 }]);
  });
});
