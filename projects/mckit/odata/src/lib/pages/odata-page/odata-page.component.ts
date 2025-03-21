import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MCPageHeadingComponent } from '@mckit/layout-core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'mc-odata-page',
  imports: [CommonModule, MCPageHeadingComponent],
  templateUrl: './odata-page.component.html',
  styleUrl: './odata-page.component.css'
})
export class MCOdataPage {
  breadcrumb = input<Array<MenuItem>>();

  title = input<string>();
  subtitle = input<string>();
}
