import { CommonModule } from '@angular/common';
import { Component, computed, contentChildren, input, TemplateRef } from '@angular/core';
import { MCColumn, MCListResponse } from '@mckit/core';
import { TableModule } from 'primeng/table';
import { MCThTemplateDirective } from '../../directives/th-template.directive';

@Component({
  selector: 'mc-table',
  imports: [CommonModule, TableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class MCTableComponent {

  columns = input.required<Array<MCColumn>>();
  columnsPrinted = computed(() => this.columns().filter((column: MCColumn) => column.isShow == undefined || column.isShow));

  response = input<MCListResponse<any>>();
  items = computed(() => this.response()?.data ?? []);

  thTemplates = contentChildren(MCThTemplateDirective);

  isThTemplate(field: string): boolean {
    return this.thTemplates().some(template => template.getFieldName() === field);
  }

  getThTemplate(field: string): TemplateRef<any> | null {
    return this.thTemplates().find(template => template.getFieldName() === field)?.template ?? null;
  }
}
