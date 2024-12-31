import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ScrollerModule } from 'primeng/scroller';
import { ItemQuickFilterComponent } from '../item-quick-filter/item-quick-filter.component';
import { DividerModule } from 'primeng/divider';
import { MCItemFilter } from '../../entities/item-filter';
import { MCFilter } from '../../entities/filter';

@Component({
  selector: 'mc-quick-filter-panel',
  standalone: true,
  imports: [CommonModule, ButtonModule, ScrollerModule, ItemQuickFilterComponent, DividerModule],
  templateUrl: './quick-filter-panel.component.html',
  styleUrl: './quick-filter-panel.component.css'
})
export class QuickFilterPanelComponent {
  quickFilters = input<Array<MCFilter>>();
  switchToAdvanced = output<void>();

  clickQuickFilterItem(quickFilter: MCFilter, item: MCItemFilter): void {
    let oldActive = item.isActive;
    quickFilter.options.forEach(i => i.isActive = false);

    if(!oldActive){
      item.isActive = !item.isActive;
    }
  }

  clickSwitchToAdvanced() {
    this.switchToAdvanced.emit();
  }
}
