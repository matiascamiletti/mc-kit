import { CommonModule } from '@angular/common';
import { Component, contentChildren, input, signal, viewChild } from '@angular/core';
import { MCColumn, MCListResponse } from '@mckit/core';
import { MCConfigFilter, MCFilterButton, MCResultFilter } from '@mckit/filter';
import { MCPageHeadingComponent, MCSearchField } from '@mckit/layout-core';
import { MCTable, MCTdTemplateDirective, MCThTemplateDirective, ShowColumnsButton } from '@mckit/table';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'mc-odata-page',
  imports: [CommonModule, MCPageHeadingComponent, MCSearchField, MCFilterButton, ShowColumnsButton, MCTable, MCThTemplateDirective, MCTdTemplateDirective],
  templateUrl: './odata-page.component.html',
  styleUrl: './odata-page.component.css'
})
export class MCOdataPage {
  breadcrumb = input<Array<MenuItem>>();

  title = input<string>();
  subtitle = input<string>();

  key = input<string>();

  hasSearch = input<boolean>(true);

  searchField = viewChild(MCSearchField);

  filters = input<MCConfigFilter>();

  columns = input.required<Array<MCColumn>>();
  hasEditColumns = input<boolean>(true);
  selectedColumns = signal<Array<MCColumn>>([]);

  hasPagination = input<boolean>(true);

  thTemplates = contentChildren(MCThTemplateDirective);
  tdTemplates = contentChildren(MCTdTemplateDirective);

  tableResponse: MCListResponse<any> = {
    data: [
      { name: 'Name 1', game_number: 1, status: 'In progress', field: 'Field La bombonera' },
      { name: 'Name 2', game_number: 2, status: 'Completed', field: 'Mostaza' },
    ]
  }

  onSearch(query: string) {
    this.searchField()?.stopLoading();
  }

  onFilter(filters: Array<MCResultFilter>) {
    //console.log(filters);
    //console.log(this.odataConverter.convert(filters));
  }

  onChangeColumns(columns: Array<MCColumn>) {
    this.selectedColumns.set(columns);
  }
}
