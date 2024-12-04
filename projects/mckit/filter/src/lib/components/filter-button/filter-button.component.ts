import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MCFilterPanelComponent } from '../filter-panel/filter-panel.component';

@Component({
  selector: 'mc-filter-button',
  standalone: true,
  imports: [ButtonModule, MCFilterPanelComponent],
  templateUrl: './filter-button.component.html',
  styleUrl: './filter-button.component.css'
})
export class MCFilterButtonComponent {

}
