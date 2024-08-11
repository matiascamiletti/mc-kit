import { Component, Input } from '@angular/core';

@Component({
  selector: 'mc-two-column-item',
  standalone: true,
  imports: [],
  templateUrl: './two-column-item.component.html',
  styleUrl: './two-column-item.component.scss'
})
export class MCTwoColumnItemComponent {
  @Input() title?: string|null;
  @Input() subtitle?: string|null;
  @Input() value?: string|null;
}
