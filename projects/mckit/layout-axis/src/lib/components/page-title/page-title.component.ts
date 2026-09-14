import { Component, input } from '@angular/core';

@Component({
  selector: 'mc-page-title, lib-page-title',
  standalone: true,
  imports: [],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.css',
})
export class MCPageTitleComponent {
  pretitle = input<string | null | undefined>();
  title = input<string | null | undefined>();
  subtitle = input<string | null | undefined>();
  customClass = input<string>('');
}

/**
 * Alias for backward/schematic compatibility
 */
export const PageTitleComponent = MCPageTitleComponent;
