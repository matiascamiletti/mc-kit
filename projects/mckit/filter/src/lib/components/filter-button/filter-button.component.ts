import { Component, computed, input, output, signal, OnInit, inject, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MCFilterPanelComponent } from '../filter-panel/filter-panel.component';
import { BadgeModule } from 'primeng/badge';
import { MCConfigFilter } from '../../entities/config';
import { MCResultFilter } from '../../entities/result';
import { FilterStore } from '../../stores/filter.store';

@Component({
    selector: 'mc-filter-button',
    imports: [ButtonModule, MCFilterPanelComponent, BadgeModule],
    templateUrl: './filter-button.component.html',
    styleUrl: './filter-button.component.css',
    providers: [FilterStore]
})
export class MCFilterButton implements OnInit {
  @ViewChild('panel') panel?: MCFilterPanelComponent;
  config = input.required<MCConfigFilter>();
  storageKey = input<string | undefined>(undefined);

  change = output<Array<MCResultFilter>>();

  total = signal<string>('');
  severity = computed(() => this.total() == '' ? 'secondary' : 'primary');

  private filterStore = inject(FilterStore);

  ngOnInit() {
    // If storageKey is provided, set the storageKey in the FilterStore
    if (this.storageKey()) {
      this.filterStore.setStorageKey(this.storageKey()!);
      this.filterStore.loadFilters(this.config().filters);
    }
  }

  updateTotal(total: number) {
    if(total == 0){
      this.total.set('');
      return
    }

    this.total.set(total.toString());
  }

  onChange(data: Array<MCResultFilter>) {
    // If there is a storage key, save the filters
    if (this.storageKey()) {
      this.filterStore.saveFilters(data);
    }

    this.change.emit(data);
  }

  /**
   * Clears the filters from storage and resets the component state
   */
  clearFilters(): void {
    if (this.storageKey()) {
      this.filterStore.clearFilters();
      this.total.set('');
      this.change.emit([]);
      this.panel?.clickClearAll();
    }
  }
}
