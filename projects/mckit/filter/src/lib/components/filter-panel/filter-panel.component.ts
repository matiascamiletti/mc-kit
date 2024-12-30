import { CommonModule } from '@angular/common';
import { Component, input, signal, Signal, viewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { ScrollerModule } from 'primeng/scroller';
import { ItemQuickFilterComponent } from '../item-quick-filter/item-quick-filter.component';
import { MCQuickFilter } from '../../entities/quick-filter';
import { MCItemFilter } from '../../entities/item-filter';
import { DividerModule } from 'primeng/divider';

export enum MCShowPanel {
  BASIC,
  ADVANCED
}

@Component({
  selector: 'mc-filter-panel',
  standalone: true,
  imports: [CommonModule, OverlayPanelModule, ButtonModule, ScrollerModule, ItemQuickFilterComponent, DividerModule],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.css'
})
export class MCFilterPanelComponent {
  overlayPanel: Signal<OverlayPanel> = viewChild.required('overlayPanel');

  quickFilters = input<Array<MCQuickFilter>>();

  showPanel = signal<MCShowPanel>(MCShowPanel.BASIC);
  showPanelBasic = MCShowPanel.BASIC;
  showPanelAdvanced = MCShowPanel.ADVANCED;

  toggle($event: any): void {
    this.overlayPanel().toggle($event);
  }

  clickQuickFilterItem(quickFilter: MCQuickFilter, item: MCItemFilter): void {
    quickFilter.items.forEach(i => i.isActive = false);
    item.isActive = !item.isActive;
  }

  clickShowAdvancedPanel(): void {
    this.showPanel.set(MCShowPanel.ADVANCED);
  }

  clickShowBasicPanel(): void {
    this.showPanel.set(MCShowPanel.BASIC);
  }
}
