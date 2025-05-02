import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, output, signal, Signal, viewChild, OnInit, inject, Optional } from '@angular/core';
import { AdvancedFiltersPanelComponent } from '../advanced-filters-panel/advanced-filters-panel.component';
import { QuickFilterPanelComponent } from '../quick-filter-panel/quick-filter-panel.component';
import { MCFilter, MCTypeFilter } from '../../entities/filter';
import { MCResultFilter } from '../../entities/result';
import { MCConfigFilter } from '../../entities/config';
import { MCItemFilter } from '../../entities/item-filter';
import { FilterStore } from '../../stores/filter.store';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';

export enum MCShowPanel {
  BASIC,
  ADVANCED
}

@Component({
    selector: 'mc-filter-panel',
    standalone: true,
    imports: [CommonModule, OverlayPanelModule, AdvancedFiltersPanelComponent, QuickFilterPanelComponent],
    templateUrl: './filter-panel.component.html',
    styleUrl: './filter-panel.component.css'
})
export class MCFilterPanelComponent implements OnInit {
  overlayPanel: Signal<OverlayPanel> = viewChild.required('overlayPanel');

  config = input.required<MCConfigFilter>();
  updateTotal = output<number>();

  quickFilters = computed(() => this.config().filters.filter(f => f.isQuickFilter));

  showPanel = signal<MCShowPanel>(MCShowPanel.BASIC);
  showPanelBasic = MCShowPanel.BASIC;
  showPanelAdvanced = MCShowPanel.ADVANCED;

  results = signal<Array<MCResultFilter>>([]);

  change = output<Array<MCResultFilter>>();

  resultsBeforeLenght = 0;

  private filterStore = inject(FilterStore, { optional: true });

  constructor() {
    effect(() => {
      if(this.quickFilters().length > 0){
        this.showPanel.set(MCShowPanel.BASIC);
      } else {
        this.showPanel.set(MCShowPanel.ADVANCED);
      }
    }, { allowSignalWrites: true });
  }

  ngOnInit() {
    // First try to load filters from the FilterStore if there is a configured storage key
    if (this.filterStore && this.filterStore.storageKey()) {
      this.filterStore.loadFilters(this.config().filters);
      if (this.filterStore.hasFilters()) {
        this.results.set([...this.filterStore.filters()]);
        this.update();
        this.emit();
        return;
      }
    }

    // If there are no filters in the FilterStore, use the initial filters from the configuration
    const currentConfig = this.config();
    const initialFilters = currentConfig?.initialFilters;
    if (initialFilters && Array.isArray(initialFilters) && initialFilters.length > 0) {
      this.results.set([...initialFilters]);
      this.update();
      this.emit();
    }
  }

  addResult(result: MCResultFilter): void {
    this.results.set([...this.results(), result]);
    this.update();
  }

  removeResultByIndex(index: number): void {
    this.results.set(this.results().filter((_, i) => i !== index));
    this.update();
  }

  removeResultByFilter(filter: MCFilter): void {
    this.results.set(this.results().filter(r => r.filter !== filter));
    this.update();
  }

  removeResultByFilterAndItem(data: { filter: MCFilter, item: MCItemFilter }): void {
    this.results.set(this.results().filter(r => {
      if(r.filter !== data.filter){
        return true;
      }

      return r.value !== data.item.value;
    }));
    this.update();
  }

  update() {
    this.updateTotal.emit(this.results().length);
  }

  emit() {
    let validFilters = this.results().filter(r => MCResultFilter.isValid(r));
    if(this.resultsBeforeLenght == 0 && validFilters.length == 0){
      return;
    }

    this.resultsBeforeLenght = validFilters.length;

    this.change.emit(validFilters);
  }

  toggle($event: any): void {
    this.overlayPanel().toggle($event);
  }

  clickShowAdvancedPanel(): void {
    this.showPanel.set(MCShowPanel.ADVANCED);
  }

  clickShowBasicPanel(): void {
    this.showPanel.set(MCShowPanel.BASIC);
  }

  clickClearAll(): void {
    this.results.set([]);
    this.update();
    this.emit();
  }
}
