
import { Component, computed, input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'mc-page-heading',
  imports: [BreadcrumbModule],
  templateUrl: './page-heading.component.html',
  styleUrl: './page-heading.component.scss'
})
export class MCPageHeadingComponent {

  breadcrumb = input<Array<MenuItem>>();
  hasBreadcrumb = computed(() => this.breadcrumb() != undefined && this.breadcrumb()!.length > 0);

  title = input<string>();
  subtitle = input<string>();
}
