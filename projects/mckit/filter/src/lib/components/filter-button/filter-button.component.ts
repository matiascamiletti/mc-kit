import { Component, computed, input, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MCFilterPanelComponent } from '../filter-panel/filter-panel.component';
import { BadgeModule } from 'primeng/badge';
import { MCConfigFilter } from '../../entities/config';
import { sign } from 'crypto';

@Component({
  selector: 'mc-filter-button',
  standalone: true,
  imports: [ButtonModule, MCFilterPanelComponent, BadgeModule],
  templateUrl: './filter-button.component.html',
  styleUrl: './filter-button.component.css'
})
export class MCFilterButtonComponent {
  config = input.required<MCConfigFilter>();

  total = signal<string>('');

  updateTotal(total: number) {
    if(total == 0){
      this.total.set('');
      return
    }

    this.total.set(total.toString());
  }
}
