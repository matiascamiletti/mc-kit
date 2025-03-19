import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ScrollerModule } from 'primeng/scroller';
import { ItemQuickFilterComponent } from '../item-quick-filter/item-quick-filter.component';
import { DividerModule } from 'primeng/divider';
import { MCItemFilter } from '../../entities/item-filter';
import { MCFilter, MCTypeFilter } from '../../entities/filter';
import { MCResultFilter } from '../../entities/result';

@Component({
    selector: 'mc-quick-filter-panel',
    imports: [CommonModule, ButtonModule, ScrollerModule, ItemQuickFilterComponent, DividerModule],
    templateUrl: './quick-filter-panel.component.html',
    styleUrl: './quick-filter-panel.component.css'
})
export class QuickFilterPanelComponent {
  quickFilters = input<Array<MCFilter>>();
  results = input.required<Array<MCResultFilter>>();

  addNewFilter = output<MCResultFilter>();
  removeFilter = output<MCFilter>();
  removeFilterAndItem = output<{ filter: MCFilter, item: MCItemFilter }>();
  switchToAdvanced = output<void>();
  clearAll = output<void>();

  isItemSelected(quickFilter: MCFilter, item: MCItemFilter): boolean {
    let result = this.results().find(r => r.filter === quickFilter);
    if(result){
      return result.value == item.value;
    }

    return false;
  }

  clickQuickFilterItem(quickFilter: MCFilter, item: MCItemFilter): void {

    let isActive = this.isItemSelected(quickFilter, item);

    this.removeFilter.emit(quickFilter);

    if(isActive){
      return;
    }

    let result = new MCResultFilter();
    result.filter = quickFilter;
    result.value = item.value;

    this.addNewFilter.emit(result);
  }

  clickSwitchToAdvanced() {
    this.switchToAdvanced.emit();
  }

  clickClearAll() {
    this.clearAll.emit();
  }
}
