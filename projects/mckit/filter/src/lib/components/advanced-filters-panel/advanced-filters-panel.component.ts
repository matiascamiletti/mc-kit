import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ScrollerModule } from 'primeng/scroller';
import { DividerModule } from 'primeng/divider';
import { ItemAdvancedFilterComponent } from '../item-advanced-filter/item-advanced-filter.component';
import { MCFilter } from '../../entities/filter';
import { MCResultFilter } from '../../entities/result';

@Component({
  selector: 'mc-advanced-filters-panel',
  standalone: true,
  imports: [CommonModule, ButtonModule, ScrollerModule, DividerModule, ItemAdvancedFilterComponent],
  templateUrl: './advanced-filters-panel.component.html',
  styleUrl: './advanced-filters-panel.component.css'
})
export class AdvancedFiltersPanelComponent {

  filters = input.required<Array<MCFilter>>();
  results = input.required<Array<MCResultFilter>>();
  hasQuickFilters = input.required<boolean>();

  addNewFilter = output<MCResultFilter>();
  removeFilterByIndex = output<number>();
  switchToQuick = output<void>();
  clearAll = output<void>();
  refresh = output();

  clickSwitchToQuick() {
    this.switchToQuick.emit();
  }

  clickAddFilter() {
    let result = new MCResultFilter();
    this.addNewFilter.emit(result);
  }

  clickAddGroup() {
    let result = new MCResultFilter();
    result.childrens = [new MCResultFilter()];
    this.addNewFilter.emit(result);
  }

  clickRemoveFilter(index: number) {
    this.removeFilterByIndex.emit(index);
  }

  clickClearAll() {
    this.clearAll.emit();
  }

  onRefresh() {
    this.refresh.emit();
  }
}
