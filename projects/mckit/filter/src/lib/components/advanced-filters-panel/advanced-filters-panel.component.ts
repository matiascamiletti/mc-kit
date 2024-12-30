import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ScrollerModule } from 'primeng/scroller';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'mc-advanced-filters-panel',
  standalone: true,
  imports: [CommonModule, ButtonModule, ScrollerModule, DividerModule],
  templateUrl: './advanced-filters-panel.component.html',
  styleUrl: './advanced-filters-panel.component.css'
})
export class AdvancedFiltersPanelComponent {

  switchToQuick = output<void>();

  clickSwitchToQuick() {
    this.switchToQuick.emit();
  }
}
