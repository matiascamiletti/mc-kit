import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ScrollerModule } from 'primeng/scroller';
import { DividerModule } from 'primeng/divider';
import { ItemAdvancedFilterComponent } from '../item-advanced-filter/item-advanced-filter.component';
import { MCFilter } from '../../entities/filter';
import { MCResultFilter } from '../../entities/result';
import { MCFilterNavigationService } from '../../services/filter-navigation.service';

@Component({
  selector: 'mc-advanced-filters-panel',
  imports: [CommonModule, ButtonModule, ScrollerModule, DividerModule, ItemAdvancedFilterComponent],
  templateUrl: './advanced-filters-panel.component.html',
  styleUrl: './advanced-filters-panel.component.css'
})
export class AdvancedFiltersPanelComponent {

  filterNavigationService = inject(MCFilterNavigationService);


  filters = input.required<Array<MCFilter>>();
  results = input.required<Array<MCResultFilter>>();
  hasQuickFilters = input.required<boolean>();

  addNewFilter = output<MCResultFilter>();
  removeFilterByIndex = output<number>();
  clearAll = output<void>();
  refresh = output();

  clickSwitchToQuick() {
    this.filterNavigationService.setBasicPanel();
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
