import { Component, DestroyRef, inject, input, OnInit, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ScrollerModule } from 'primeng/scroller';
import { ItemQuickFilterComponent } from '../item-quick-filter/item-quick-filter.component';
import { DividerModule } from 'primeng/divider';
import { MCItemFilter } from '../../entities/item-filter';
import { MCFilter, MCTypeFilter } from '../../entities/filter';
import { MCResultFilter } from '../../entities/result';
import { MCFilterNavigationService } from '../../services/filter-navigation.service';
import { MCFilterStore } from '../../stores/filter.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'mc-quick-filter-panel',
  imports: [CommonModule, ButtonModule, ScrollerModule, ItemQuickFilterComponent, DividerModule],
  templateUrl: './quick-filter-panel.component.html',
  styleUrl: './quick-filter-panel.component.css'
})
export class QuickFilterPanelComponent implements OnInit {

  filterStorage = input.required<MCFilterStore>();

  filterNavigationService = inject(MCFilterNavigationService);

  destroyRef = inject(DestroyRef);

  quickFilters = signal<Array<MCFilter>>([]);
  results = signal<Array<MCResultFilter>>([]);

  ngOnInit() {
    this.loadStorage();
  }

  isItemSelected(filter: MCFilter, item: MCItemFilter): boolean {
    let results = this.filterStorage()?.getResultsByFilter(filter);
    if (results.length == 0) {
      return false;
    }

    let isExist = false;
    for (let i = 0; i < results.length; i++) {
      const element = results[i];
      if (element.value == item.value) {
        isExist = true;
        break;
      }
    }

    return isExist;
  }

  clickItem(filter: MCFilter, item: MCItemFilter) {
    let result = this.filterStorage()?.getResultByFilter(filter);
    if (result != undefined) {
      console.log('remove');
      console.log(result);
      this.filterStorage()?.removeResultMain(result);
    }

    this.filterStorage()?.addResultByFilter(filter, item.value, true);
  }

  loadStorage() {
    this.quickFilters.set(this.filterStorage()?.getQuickFilters() || []);

    this.filterStorage()?.getOnUpdate()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((results) => {
          this.results.set(results);
        })
      )
      .subscribe();
  }

  clickClearAll() {
    this.filterStorage()?.cleanResults();
  }

  clickSwitchToAdvanced() {
    this.filterNavigationService.setAdvancedPanel();
  }

}
