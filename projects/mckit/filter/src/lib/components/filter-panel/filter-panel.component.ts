import { CommonModule } from '@angular/common';
import { Component, input, Signal, viewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { ScrollerModule } from 'primeng/scroller';
import { ItemQuickFilterComponent } from '../item-quick-filter/item-quick-filter.component';
import { MCQuickFilter } from '../../entities/quick-filter';


@Component({
  selector: 'mc-filter-panel',
  standalone: true,
  imports: [CommonModule, OverlayPanelModule, ButtonModule, ScrollerModule, ItemQuickFilterComponent],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.css'
})
export class MCFilterPanelComponent {
  overlayPanel: Signal<OverlayPanel> = viewChild.required('overlayPanel');

  quickFilters = input<Array<MCQuickFilter>>();

  toggle($event: any): void {
    this.overlayPanel().toggle($event);
  }
}
