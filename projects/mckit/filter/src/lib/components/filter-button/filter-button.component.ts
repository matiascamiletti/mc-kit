import { Component, computed, input, output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MCFilterPanelComponent } from '../filter-panel/filter-panel.component';
import { BadgeModule } from 'primeng/badge';
import { MCConfigFilter } from '../../entities/config';
import { MCResultFilter } from '../../entities/result';

@Component({
    selector: 'mc-filter-button',
    imports: [ButtonModule, MCFilterPanelComponent, BadgeModule],
    templateUrl: './filter-button.component.html',
    styleUrl: './filter-button.component.css'
})
export class MCFilterButton {
  config = input.required<MCConfigFilter>();

  change = output<Array<MCResultFilter>>();

  total = signal<string>('');
  severity = computed(() => this.total() == '' ? 'secondary' : 'primary');

  updateTotal(total: number) {
    if(total == 0){
      this.total.set('');
      return
    }

    this.total.set(total.toString());
  }

  onChange(data: Array<MCResultFilter>) {
    this.change.emit(data);
  }
}
