import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, input, OnInit, output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ScrollerModule } from 'primeng/scroller';
import { DividerModule } from 'primeng/divider';
import { ItemAdvancedFilterComponent } from '../item-advanced-filter/item-advanced-filter.component';
import { MCFilter } from '../../entities/filter';
import { MCResultFilter } from '../../entities/result';
import { MCFilterNavigationService } from '../../services/filter-navigation.service';
import { MCFilterStore } from '../../stores/filter.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'mc-advanced-filters-panel',
  imports: [CommonModule, ButtonModule, ScrollerModule, DividerModule, ItemAdvancedFilterComponent],
  templateUrl: './advanced-filters-panel.component.html',
  styleUrl: './advanced-filters-panel.component.css'
})
export class AdvancedFiltersPanelComponent implements OnInit {

  filterNavigationService = inject(MCFilterNavigationService);

  filterStorage = input.required<MCFilterStore>();

  filters = signal<Array<MCFilter>>([]);
  results = signal<Array<MCResultFilter>>([]);

  destroyRef = inject(DestroyRef);

  hasQuickFilters = signal<boolean>(false);

  ngOnInit() {
    this.loadStorage();
  }

  clickAddFilter() {
    let result = new MCResultFilter();
    this.filterStorage()?.addResult(result, false);
  }

  clickAddGroup() {
    let result = new MCResultFilter();
    result.childrens = [new MCResultFilter()];
    this.filterStorage()?.addResult(result, false);
  }

  clickRemoveFilter(index: number) {
    this.filterStorage()?.removeResultByIndex(index, false);
  }

  clickApply() {
    this.filterStorage()?.emitApply();
  }

  loadStorage() {
    this.filters.set(this.filterStorage()?.getFilters() || []);
    this.hasQuickFilters.set(this.filterStorage()?.hasQuickFilters() || false);

    this.filterStorage()?.getOnUpdate()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((results) => {
          this.results.set(results);
        })
      )
      .subscribe();
  }

  clickSwitchToQuick() {
    this.filterNavigationService.setBasicPanel();
  }

  clickClearAll() {
    this.filterStorage()?.cleanResults();
  }

}
