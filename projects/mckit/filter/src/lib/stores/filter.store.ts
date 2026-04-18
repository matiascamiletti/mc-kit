import { Injectable } from '@angular/core';
import { MCResultFilter, MCConditionResult } from '../entities/result';
import { MCFilter, MCTypeFilter } from '../entities/filter';
import { MCItemFilter } from '../entities/item-filter';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BehaviorSubject, Observable, Subject, take, takeWhile, tap } from 'rxjs';

export class MCFilterStore {

  protected storageKey: string | undefined;
  protected storageMap: StorageMap;

  protected filters: Array<MCFilter> = [];
  protected results: Array<MCResultFilter> = [];

  protected onUpdate = new BehaviorSubject<Array<MCResultFilter>>([]);
  protected onApply = new Subject<Array<MCResultFilter>>();
  protected onInit = new BehaviorSubject<boolean>(false);

  constructor(
    storageKey: string | undefined,
    storageMap: StorageMap,
    filters: Array<MCFilter>
  ) {
    this.setStorageKey(storageKey);
    this.storageMap = storageMap;
    this.filters = filters;
    this.initSaveds();
  }

  removeResultByFilterAndValue(filter: MCFilter, value: any, emit?: boolean) {
    let results = this.results.filter(r => r.filter == filter || r.filter?.key === filter.key);
    results.forEach((result, index) => {
      if (result.value == value) {
        this.removeResult(this.results, result);
      }
    });

    this.onUpdate.next(this.results);

    if (emit) {
      this.emitApply();
    }
  }

  removeResultByIndex(index: number, emit?: boolean) {
    this.results.splice(index, 1);
    this.onUpdate.next(this.results);

    if (emit) {
      this.emitApply();
    }
  }

  addResultByFilter(filter: MCFilter, value: any, emit?: boolean) {
    let result = new MCResultFilter();
    result.filter = filter;
    result.value = value;
    this.addResult(result, emit);
  }

  addResult(result: MCResultFilter, emit?: boolean) {
    this.results.push(result);
    this.onUpdate.next(this.results);

    if (emit) {
      this.emitApply();
    }
  }

  getResultByFilter(filter: MCFilter): MCResultFilter | undefined {
    return this.results.find(r => r.filter == filter || r.filter?.key === filter.key);
  }

  getResultsByFilter(filter: MCFilter): Array<MCResultFilter> {
    return this.results.filter(r => r.filter == filter || r.filter?.key === filter.key);
  }

  getOnUpdate(): Observable<Array<MCResultFilter>> {
    return this.onUpdate.asObservable();
  }

  getOnApply(): Observable<Array<MCResultFilter>> {
    return this.onApply.asObservable();
  }

  emitUpdate() {
    this.onUpdate.next(this.results);
  }

  emitApply() {
    this.onApply.next(this.results);
    this.saveResults();
  }

  emitInit() {
    this.onInit.next(true);
  }

  getOnInit(): Observable<boolean> {
    return this.onInit.asObservable();
  }

  getFilters(): Array<MCFilter> {
    return this.filters;
  }

  getQuickFilters(): Array<MCFilter> {
    return this.filters.filter(f => f.isQuickFilter);
  }

  hasQuickFilters(): boolean {
    return this.getQuickFilters().length > 0;
  }

  removeResultMain(result: MCResultFilter) {
    this.removeResult(this.results, result);
  }

  removeResult(results: Array<MCResultFilter>, result: MCResultFilter) {
    const index = results.indexOf(result);
    if (index > -1) {
      results.splice(index, 1);
    }
  }

  removeResultInChildrenMain(result: MCResultFilter) {
    this.removeResultInChildren(this.results, result);
  }

  removeResultInChildren(results: Array<MCResultFilter>, result: MCResultFilter) {
    results.forEach(r => {
      if (r.childrens && r.childrens.length > 0) {
        this.removeResultInChildren(r.childrens, result);
      } else {
        this.removeResult(results, result);
      }
    });
  }

  processResult(results: Array<MCResultFilter>, result: MCResultFilter) {
    if (result.filter == undefined || result.filter.key == undefined || result.filter?.key == '') {
      this.removeResult(results, result);
      return;
    }

    const filter = this.filters.find(f => (f.key == result.filter?.key && f.type == result.filter?.type));
    if (filter == undefined) {
      this.removeResult(results, result);
      return;
    }

    result.filter = filter;

    if (result.childrens && result.childrens.length > 0) {
      this.processResults(result.childrens);
    }
  }

  processResults(results: Array<MCResultFilter>) {
    if (results.length == 0 || this.filters.length == 0) {
      return;
    }

    results.forEach(result => this.processResult(results, result));
  }

  loadSaveds(dataSaved: string) {
    if (dataSaved == '') {
      return;
    }

    try {
      this.results = JSON.parse(dataSaved) as Array<MCResultFilter>;
    } catch (error) {
      console.error('Error loading filters from localStorage:', error);
      this.results = [];
    }

    this.processResults(this.results);
  }

  initSaveds() {
    if (this.storageKey == undefined) {
      return;
    }

    this.storageMap.get<string | undefined>(this.getStorageKey()!, { type: 'string' })
      .pipe(
        take(1),
        takeWhile((dataSaved) => {

          if (dataSaved == undefined) {
            this.emitInit();
          }

          return dataSaved != undefined;
        }),
        tap(dataSaved => this.loadSaveds(dataSaved)),
        tap(() => this.emitUpdate()),
        tap(() => this.emitInit()),
      )
      .subscribe();
  }

  saveResults() {
    if (this.storageKey == undefined) {
      return;
    }

    this.storageMap.set(this.getStorageKey()!, JSON.stringify(this.results)).pipe(take(1)).subscribe();
  }

  setStorageKey(key: string | undefined) {
    this.storageKey = key;
    if (key == '') {
      this.storageKey = undefined;
    }
  }

  getStorageKey(): string | undefined {
    return this.storageKey != undefined ? 'mc_filter_' + this.storageKey : undefined;
  }

  getResults(): Array<MCResultFilter> {
    return this.results;
  }

  cleanResults() {
    this.results = [];
    this.onUpdate.next(this.results);
    this.emitApply();
    this.saveResults();
  }
}















@Injectable()
export class FilterStore {

  private reconstructFilters(
    savedFilters: MCResultFilter[],
    configFilters: MCFilter[]
  ): MCResultFilter[] {
    return savedFilters.map(filter => {
      const resultFilter = new MCResultFilter();

      // Assign operator
      resultFilter.operator = filter.operator;

      // Reconstruct the configured filter
      const filterConfig = filter.filter;
      if (filterConfig?.key) {
        // Search all filters that match the key
        const matchingFilters = configFilters.filter(f => f.key === filterConfig.key);

        if (matchingFilters.length > 0) {
          // If there are multiple filters with the same key, search for the one that matches the type
          const originalFilter = matchingFilters.find(f => f.type === filterConfig.type) || matchingFilters[0];

          // Create a complete copy of the original filter to preserve all its properties
          resultFilter.filter = {
            ...originalFilter,
            title: originalFilter.title,
            type: originalFilter.type,
            key: originalFilter.key,
            options: originalFilter.options,
            isQuickFilter: originalFilter.isQuickFilter,
            isShowConditions: originalFilter.isShowConditions,
            data: originalFilter.data
          };

          // Handle each type of filter specifically
          switch (originalFilter.type) {
            case MCTypeFilter.MULTISELECT:
              resultFilter.condition = MCConditionResult.IN;
              resultFilter.value = Array.isArray(filter.value) ? filter.value : (filter.value ? [filter.value] : []);
              break;
            case MCTypeFilter.MULTISELECT_AUTOCOMPLETE:
              resultFilter.condition = MCConditionResult.IN;
              resultFilter.value = Array.isArray(filter.value) ? filter.value : (filter.value ? [filter.value] : []);

              // Handle the selectedOptions for MultiselectAutocomplete
              if (filter.selectedOptions && Array.isArray(filter.selectedOptions)) {
                // Use stored selectedOptions if available
                resultFilter.selectedOptions = filter.selectedOptions;
              } else {
                // Create selectedOptions from values if not available
                resultFilter.selectedOptions = resultFilter.value.map((value: any) => {
                  return { label: String(value), value: value } as MCItemFilter;
                });
              }
              break;
            case MCTypeFilter.TEXT:
            case MCTypeFilter.SELECT:
              // For text and select, keep the original operator and condition to allow OR/AND
              resultFilter.condition = filter.condition || MCConditionResult.EQUALS;
              resultFilter.value = filter.value;
              break;
            default:
              resultFilter.condition = filter.condition;
              resultFilter.value = filter.value;
          }

          // If there are multiple filters of the same type and key, ensure to keep the operator
          if (matchingFilters.length > 1) {
            resultFilter.operator = filter.operator || 'or'; // Default to 'or' if no operator
          }
        } else {
          console.warn(`No filter found with key ${filterConfig.key}`);
          // Keep the original values if no filter is found
          resultFilter.filter = filterConfig;
          resultFilter.condition = filter.condition;
          resultFilter.value = filter.value;
          resultFilter.selectedOptions = filter.selectedOptions;
        }
      } else {
        // If there is no configured filter, keep the original values
        resultFilter.condition = filter.condition;
        resultFilter.value = filter.value;
        resultFilter.selectedOptions = filter.selectedOptions;
      }

      // Reconstruct child filters recursively
      const childrens = filter.childrens;
      if (childrens && childrens.length > 0) {
        resultFilter.childrens = this.reconstructFilters(childrens, configFilters);
      }

      return resultFilter;
    });
  }
} 