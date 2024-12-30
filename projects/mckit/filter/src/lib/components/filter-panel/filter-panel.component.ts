import { CommonModule } from '@angular/common';
import { Component, input, signal, Signal, viewChild } from '@angular/core';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { MCQuickFilter } from '../../entities/quick-filter';
import { AdvancedFiltersPanelComponent } from '../advanced-filters-panel/advanced-filters-panel.component';
import { QuickFilterPanelComponent } from '../quick-filter-panel/quick-filter-panel.component';

export enum MCShowPanel {
  BASIC,
  ADVANCED
}

@Component({
  selector: 'mc-filter-panel',
  standalone: true,
  imports: [CommonModule, OverlayPanelModule, AdvancedFiltersPanelComponent, QuickFilterPanelComponent],
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

  clickShowAdvancedPanel(): void {
    this.showPanel.set(MCShowPanel.ADVANCED);
  }

  clickShowBasicPanel(): void {
    this.showPanel.set(MCShowPanel.BASIC);
  }
}
