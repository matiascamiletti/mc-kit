import { CommonModule } from '@angular/common';
import { Component, computed, contentChildren, input, output, TemplateRef } from '@angular/core';
import { MCColumn, MCListResponse } from '@mckit/core';
import { TableModule, TablePageEvent } from 'primeng/table';
import { MCThTemplateDirective } from '../../directives/th-template.directive';
import { MCTdTemplateDirective } from '../../directives/td-template.directive';

@Component({
  selector: 'mc-table',
  imports: [CommonModule, TableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class MCTable {

  columns = input.required<Array<MCColumn>>();
  columnsPrinted = computed(() => this.columns().filter((column: MCColumn) => column.isShow == undefined || column.isShow));

  response = input<MCListResponse<any>>();
  items = computed(() => this.response()?.data ?? []);

  thTemplates = contentChildren(MCThTemplateDirective);
  tdTemplates = contentChildren(MCTdTemplateDirective);

  paginator = input<boolean>(true);
  onPage = output<TablePageEvent>();

  onSort = output<any>();
  sortField = input<string>();
  sortOrder = input<number>(-1);

  onSortChange(event: any) {
    this.onSort.emit(event);
  }

  customSort(event: any) { }

  onPageChange(event: TablePageEvent) {
    this.onPage.emit(event);
  }

  isThTemplate(field: string): boolean {
    return this.thTemplates().some(template => template.getFieldName() === field);
  }

  getThTemplate(field: string): TemplateRef<any> | null {
    return this.thTemplates().find(template => template.getFieldName() === field)?.template ?? null;
  }

  isTdTemplate(field: string): boolean {
    return this.tdTemplates().some(template => template.getFieldName() === field);
  }

  getTdTemplate(field: string): TemplateRef<any> | null {
    return this.tdTemplates().find(template => template.getFieldName() === field)?.template ?? null;
  }
}
