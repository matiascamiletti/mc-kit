import { Component, input, output } from '@angular/core';
import { MCQuickFilter } from '../../entities/quick-filter';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ScrollerModule } from 'primeng/scroller';
import { ItemQuickFilterComponent } from '../item-quick-filter/item-quick-filter.component';
import { DividerModule } from 'primeng/divider';
import { MCItemFilter } from '../../entities/item-filter';

@Component({
  selector: 'mc-quick-filter-panel',
  standalone: true,
  imports: [CommonModule, ButtonModule, ScrollerModule, ItemQuickFilterComponent, DividerModule],
  templateUrl: './quick-filter-panel.component.html',
  styleUrl: './quick-filter-panel.component.css'
})
export class QuickFilterPanelComponent {
  quickFilters = input<Array<MCQuickFilter>>();
  switchToAdvanced = output<void>();

  clickQuickFilterItem(quickFilter: MCQuickFilter, item: MCItemFilter): void {
    let oldActive = item.isActive;
    quickFilter.items.forEach(i => i.isActive = false);

    if(!oldActive){
      item.isActive = !item.isActive;
    }
  }

  clickSwitchToAdvanced() {
    this.switchToAdvanced.emit();
  }
}
