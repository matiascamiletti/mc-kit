import { CommonModule } from '@angular/common';
import { Component, computed, input, signal, Signal, viewChild } from '@angular/core';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { AdvancedFiltersPanelComponent } from '../advanced-filters-panel/advanced-filters-panel.component';
import { QuickFilterPanelComponent } from '../quick-filter-panel/quick-filter-panel.component';
import { MCFilter } from '../../entities/filter';
import { MCResultFilter } from '../../entities/result';
import { MCConfigFilter } from '../../entities/config';

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

  config = input.required<MCConfigFilter>();

  quickFilters = computed(() => this.config().filters.filter(f => f.isQuickFilter));

  showPanel = signal<MCShowPanel>(MCShowPanel.BASIC);
  showPanelBasic = MCShowPanel.BASIC;
  showPanelAdvanced = MCShowPanel.ADVANCED;

  results = signal<Array<MCResultFilter>>([]);

  addResult(result: MCResultFilter): void {
    this.results.set([...this.results(), result]);
  }

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
