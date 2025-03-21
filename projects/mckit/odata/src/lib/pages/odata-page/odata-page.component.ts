import { CommonModule } from '@angular/common';
import { Component, input, viewChild } from '@angular/core';
import { MCPageHeadingComponent, MCSearchField } from '@mckit/layout-core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'mc-odata-page',
  imports: [CommonModule, MCPageHeadingComponent, MCSearchField],
  templateUrl: './odata-page.component.html',
  styleUrl: './odata-page.component.css'
})
export class MCOdataPage {
  breadcrumb = input<Array<MenuItem>>();

  title = input<string>();
  subtitle = input<string>();

  keySearch = input<string>();
  hasSearch = input<boolean>(true);

  searchField = viewChild(MCSearchField);

  onSearch(query: string) {
    this.searchField()?.stopLoading();
  }
}
