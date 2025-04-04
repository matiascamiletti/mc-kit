import { computed, Injectable, PLATFORM_ID, Inject, Signal, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MCResultFilter, MCConditionResult } from '../entities/result';
import { MCFilter, MCTypeFilter } from '../entities/filter';

export interface FilterState {
  filters: MCResultFilter[];
  storageKey?: string;
}

const initialState: FilterState = {
  filters: [],
  storageKey: undefined
};

@Injectable({ providedIn: 'root' })
export class FilterStore {
  private isBrowser: boolean;
  
  // State signals
  private state = signal<FilterState>(initialState);
  
  // Computed signals
  readonly filters = computed(() => this.state().filters);
  readonly storageKey = computed(() => this.state().storageKey);
  readonly hasFilters = computed(() => this.state().filters.length > 0);

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  setStorageKey(key: string) {
    this.state.update(state => ({
      ...state,
      storageKey: key
    }));
  }

  loadFilters(configFilters: MCFilter[]) {
    if (this.isBrowser && this.storageKey()) {
      try {
        const savedFilters = localStorage.getItem(this.storageKey()!);
        if (savedFilters) {
          const parsedFilters = JSON.parse(savedFilters) as Array<MCResultFilter>;
          const reconstructedFilters = this.reconstructFilters(parsedFilters, configFilters);
          this.state.update(state => ({
            ...state,
            filters: reconstructedFilters
          }));
        }
      } catch (error) {
        console.error('Error loading filters from localStorage:', error);
      }
    }
  }

  saveFilters(newFilters: MCResultFilter[]) {
    if (this.isBrowser && this.storageKey()) {
      try {
        localStorage.setItem(this.storageKey()!, JSON.stringify(newFilters));
        this.state.update(state => ({
          ...state,
          filters: newFilters
        }));
      } catch (error) {
        console.error('Error saving filters to localStorage:', error);
      }
    }
  }

  clearFilters() {
    if (this.isBrowser && this.storageKey()) {
      try {
        localStorage.removeItem(this.storageKey()!);
        this.state.update(state => ({
          ...state,
          filters: []
        }));
      } catch (error) {
        console.error('Error clearing filters from localStorage:', error);
      }
    }
  }

  private reconstructFilters(
    savedFilters: MCResultFilter[],
    configFilters: MCFilter[]
  ): MCResultFilter[] {
    return savedFilters.map(filter => {
      const resultFilter = new MCResultFilter();
      
      // Asignar propiedades básicas
      resultFilter.operator = filter.operator;
      
      // Reconstruir el filtro configurado
      const filterConfig = filter.filter;
      if (filterConfig?.key) {
        // Buscar todos los filtros que coincidan con el key
        const matchingFilters = configFilters.filter(f => f.key === filterConfig.key);
        
        if (matchingFilters.length > 0) {
          // Si hay múltiples filtros con el mismo key, buscar el que coincida con el tipo
          const originalFilter = matchingFilters.find(f => f.type === filterConfig.type) || matchingFilters[0];

          // Crear una copia completa del filtro original para preservar todas sus propiedades
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

          // Manejar específicamente cada tipo de filtro
          switch (originalFilter.type) {
            case MCTypeFilter.MULTISELECT:
              resultFilter.condition = MCConditionResult.IN;
              resultFilter.value = Array.isArray(filter.value) ? filter.value : (filter.value ? [filter.value] : []);
              break;
            case MCTypeFilter.TEXT:
            case MCTypeFilter.SELECT:
              // Para text y select, mantener el operador y condición original para permitir OR/AND
              resultFilter.condition = filter.condition || MCConditionResult.EQUALS;
              resultFilter.value = filter.value;
              break;
            default:
              resultFilter.condition = filter.condition;
              resultFilter.value = filter.value;
          }

          // Si hay múltiples filtros del mismo tipo y key, asegurarse de mantener el operador
          if (matchingFilters.length > 1) {
            resultFilter.operator = filter.operator || 'or'; // Default a 'or' si no hay operador
          }
        } else {
          console.warn(`No filter found with key ${filterConfig.key}`);
          // Mantener los valores originales si no encontramos ningún filtro
          resultFilter.filter = filterConfig;
          resultFilter.condition = filter.condition;
          resultFilter.value = filter.value;
        }
      } else {
        // Si no hay filtro configurado, mantener los valores originales
        resultFilter.condition = filter.condition;
        resultFilter.value = filter.value;
      }

      // Reconstruir filtros hijos recursivamente
      const childrens = filter.childrens;
      if (childrens && childrens.length > 0) {
        resultFilter.childrens = this.reconstructFilters(childrens, configFilters);
      }
      
      return resultFilter;
    });
  }
} 