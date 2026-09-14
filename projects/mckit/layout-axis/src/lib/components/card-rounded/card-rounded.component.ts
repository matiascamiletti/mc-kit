import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'mc-card-rounded',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './card-rounded.component.html',
  styleUrl: './card-rounded.component.css',
})
export class MCCardRoundedComponent {
  title = input<string | null | undefined>();
  actionText = input<string | null | undefined>();
  actionUrl = input<string | any[] | null | undefined>();
  actionTarget = input<string>('_self');
  customClass = input<string>('');

  actionClick = output<MouseEvent>();

  onActionClick(event: MouseEvent): void {
    this.actionClick.emit(event);
  }
}

/**
 * Alias for backward/schematic compatibility
 */
export const CardRoundedComponent = MCCardRoundedComponent;

