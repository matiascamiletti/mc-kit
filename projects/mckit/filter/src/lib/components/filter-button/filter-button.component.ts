import { Component, computed, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MCFilterPanelComponent } from '../filter-panel/filter-panel.component';
import { BadgeModule } from 'primeng/badge';
import { MCConfigFilter } from '../../entities/config';

@Component({
  selector: 'mc-filter-button',
  standalone: true,
  imports: [ButtonModule, MCFilterPanelComponent, BadgeModule],
  templateUrl: './filter-button.component.html',
  styleUrl: './filter-button.component.css'
})
export class MCFilterButtonComponent {
  config = input.required<MCConfigFilter>();

}
