import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { MCColumn, MCListResponse } from '@mckit/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'mc-table',
  imports: [CommonModule, TableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class MCTableComponent {

  columns = input.required<Array<MCColumn>>();

  response = input<MCListResponse<any>>();
  items = computed(() => this.response()?.data ?? []);

}
