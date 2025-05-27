import { CommonModule } from '@angular/common';
import { Component, OnInit, viewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TestTableService, Product } from './test-table.service';
import { inject } from '@angular/core';

import {
  MCFilterButton,
  MCFilter,
  MCConfigFilter,
  MCResultFilter,
} from '@mckit/filter';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MCOdataTableComponent } from '@mckit/odata';
import { MCFilterOdataConverterService } from '@mckit/filter';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { InputIconModule } from 'primeng/inputicon';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-test-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    IconFieldModule,
    InputTextModule,
    ButtonModule,
    MCFilterButton,
    ToastModule,
    TagModule,
    TooltipModule,
    InputIconModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './test-table.component.html',
  styleUrl: './test-table.component.scss',
})
export class TestTableComponent
  extends MCOdataTableComponent<Product>
  implements OnInit
{
  override httpService = inject(TestTableService);
  private odataConverter = inject(MCFilterOdataConverterService);

  override tableKey = 'test-table-list';
  filterButton = viewChild<MCFilterButton>('McFilterButton');
  filterConfig = new MCConfigFilter();

  override columns = [
    { field: 'id', title: 'ID', isShow: true },
    { field: 'name', title: 'Name', isShow: true },
    { field: 'price', title: 'Price', isShow: true },
    { field: 'category', title: 'Category', isShow: true },
    { field: 'stock', title: 'Stock', isShow: true },
    { field: 'rating', title: 'Rating', isShow: true },
    { field: 'createdAt', title: 'Created', isShow: true },
  ];

  override searchFieldsKey: string[] = ['name', 'category', 'description'];

  override ngOnInit() {
    this.data.top = 10;
    this.data.orderBy = 'createdAt desc';
    super.ngOnInit();
    this.loadFilterConfig();
  }

  loadFilterConfig() {
    this.filterConfig.filters = [
      MCFilter.text({
        title: 'Name',
        key: 'name',
      }),
      MCFilter.multiselect({
        title: 'Category',
        key: 'category',
        options: [
          { label: 'Electronics', value: 'Electronics' },
          { label: 'Clothing', value: 'Clothing' },
          { label: 'Food', value: 'Food' },
        ],
      }),
      MCFilter.multiselect({
        title: 'Rating',
        key: 'rating',
        options: [
          { label: '4.5+ Stars', value: '4.5' },
          { label: '4.0+ Stars', value: '4.0' },
          { label: '3.5+ Stars', value: '3.5' },
        ],
      }),
      MCFilter.multiselectAutocomplete({
        title: 'Categories Search',
        key: 'category',
        placeholder: 'Search and select categories',
        filter: (query: string) => this.httpService.getCategories(query),
        maxSelectedLabels: 1,
      }),
    ];
  }

  onFilter(filters: Array<MCResultFilter>) {
    let filterOdata = this.odataConverter.convert(filters);
    this.data.filters.cleanPostpend();
    this.data.filters.setPostpend(filterOdata);
    this.data.skip = 0;
    this.loadItems();
  }

  totalColumnsShow(): number {
    return this.columns.filter((column) => column.isShow).length + 2;
  }

  getCategorySeverity(
    category: string
  ): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
    switch (category) {
      case 'Electronics':
        return 'info';
      case 'Clothing':
        return 'success';
      case 'Food':
        return 'warn';
      default:
        return 'info';
    }
  }

  getStockSeverity(
    stock: number
  ): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
    if (stock > 100) return 'success';
    if (stock > 50) return 'warn';
    return 'danger';
  }
}
