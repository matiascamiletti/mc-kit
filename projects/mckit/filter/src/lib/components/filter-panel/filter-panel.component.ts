import { CommonModule } from '@angular/common';
import { Component, computed, input, output, signal, Signal, viewChild } from '@angular/core';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { AdvancedFiltersPanelComponent } from '../advanced-filters-panel/advanced-filters-panel.component';
import { QuickFilterPanelComponent } from '../quick-filter-panel/quick-filter-panel.component';
import { MCFilter, MCTypeFilter } from '../../entities/filter';
import { MCResultFilter } from '../../entities/result';
import { MCConfigFilter } from '../../entities/config';
import { MCItemFilter } from '../../entities/item-filter';

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
  updateTotal = output<number>();

  quickFilters = computed(() => this.config().filters.filter(f => f.isQuickFilter));

  showPanel = signal<MCShowPanel>(MCShowPanel.BASIC);
  showPanelBasic = MCShowPanel.BASIC;
  showPanelAdvanced = MCShowPanel.ADVANCED;

  results = signal<Array<MCResultFilter>>([]);

  addResult(result: MCResultFilter): void {
    this.results.set([...this.results(), result]);
    this.update();
  }

  removeResultByIndex(index: number): void {
    this.results.set(this.results().filter((_, i) => i !== index));
    this.update();
  }

  removeResultByFilter(filter: MCFilter): void {
    this.results.set(this.results().filter(r => r.filter !== filter));
    this.update();
  }

  removeResultByFilterAndItem(data: { filter: MCFilter, item: MCItemFilter }): void {
    this.results.set(this.results().filter(r => {
      if(r.filter !== data.filter){
        return true;
      }

      return r.value !== data.item.value;
    }));
    this.update();
  }

  update() {
    this.updateTotal.emit(this.results().length);
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
