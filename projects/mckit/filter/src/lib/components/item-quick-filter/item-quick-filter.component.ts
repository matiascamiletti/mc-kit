import { Component, input } from '@angular/core';
import { MCItemFilter } from '../../entities/item-filter';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-item-quick-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-quick-filter.component.html',
  styleUrl: './item-quick-filter.component.css'
})
export class ItemQuickFilterComponent {
  item = input.required<MCItemFilter>();
  isActive = input<boolean>();
}
