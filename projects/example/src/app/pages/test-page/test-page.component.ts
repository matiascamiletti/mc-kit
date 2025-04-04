import { Component, inject, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MCMiniResumeCard } from '../../../../../mckit/layout/src/public-api';
import { MCSimplePage } from '../../../../../mckit/layout/src/lib/pages/simple-page/simple-page.component';
import { MenuItem } from 'primeng/api';
import { CurrencyPipe } from '@angular/common';
import { MCTwoColumnItemComponent } from '../../../../../mckit/layout/src/lib/lists/two-column-item/two-column-item.component';
import { MCPageHeadingComponent, MCTopbarService } from '../../../../../mckit/layout-core/src/public-api';
import { MCFilterOdataConverterService, MCFilterButton, MCItemFilter } from '../../../../../mckit/filter/src/public-api';
import { MCConfigFilter } from '../../../../../mckit/filter/src/lib/entities/config';
import { MCFilter } from '../../../../../mckit/filter/src/lib/entities/filter';
import { MCResultFilter } from '../../../../../mckit/filter/src/lib/entities/result';
import { Observable, of } from 'rxjs';
import { MCTable } from '../../../../../mckit/table/src/lib/components/table/table.component';
import { MCColumn, MCListResponse } from '@mckit/core';
import { MCTdTemplateDirective, MCThTemplateDirective } from '../../../../../mckit/table/src/public-api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FilterStore } from '../../../../../mckit/filter/src/lib/stores/filter.store';

@Component({
    selector: 'app-test-page',
    imports: [MCSimplePage, MCMiniResumeCard, CurrencyPipe, MCTwoColumnItemComponent, MCFilterButton, MCPageHeadingComponent, MCTable, MCThTemplateDirective, MCTdTemplateDirective, ButtonModule, ToastModule],
    providers: [MessageService],
    templateUrl: './test-page.component.html',
    styleUrl: './test-page.component.scss'
})
export class TestPageComponent implements OnInit {
  private readonly STORAGE_KEY = 'test-page-filters';
  
  odataConverter = inject(MCFilterOdataConverterService);
  messageService = inject(MessageService);
  filterStore = inject(FilterStore);

  breadcrumb: MenuItem[] = [
    { label: 'Home', routerLink: '/' },
    { label: 'Test Page' }
  ];

  filterConfig = new MCConfigFilter();

  tableColumns: Array<MCColumn> = [];
  tableResponse = new MCListResponse<any>();

  constructor(
    protected topbarService: MCTopbarService,
  ) {
    this.filterStore.setStorageKey(this.STORAGE_KEY);
  }

  ngOnInit(): void {
    this.topbarService.subtitle.update(() => 'Test Page');
    this.loadFilterConfig();
    this.loadTable();
    this.loadSavedFilters();
  }

  onFilter(filters: Array<MCResultFilter>) {
    console.log(filters);
    console.log(this.odataConverter.convert(filters));
    
    this.filterStore.saveFilters(filters);
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Filtros guardados correctamente' });
  }

  loadSavedFilters() {
    this.filterStore.loadFilters(this.filterConfig.filters);
    if (this.filterStore.hasFilters()) {
      this.filterConfig.initialFilters = this.filterStore.filters();
      this.messageService.add({ severity: 'info', summary: 'Información', detail: 'Filtros cargados del almacenamiento local' });
    }
  }

  clearSavedFilters() {
    this.filterStore.clearFilters();
    this.filterConfig.initialFilters = [];
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Filtros eliminados correctamente' });
  }

  onFilterAutocomplete(query: string): Observable<Array<MCItemFilter>> {
    return of([
      { label: 'Field La bombonera', value: 'Field La bombonera' },
      { label: 'Mostaza', value: 'Mostaza' },
      { label: 'La bombonera', value: 'La bombonera' },
      { label: 'McDonalds', value: 'McDonalds' },
    ]);
  }

  loadFilterConfig() {
    this.filterConfig.filters = [
      MCFilter.text({
        title: 'Name',
        key: 'name'
      }),
      MCFilter.textQuickFilter({
        title: 'Game #',
        key: 'game_number',
        options: [
          { label: '1', value: '1' },
          { label: '2', value: '2' },
          { label: '3', value: '3' },
          { label: '4', value: '4' },
          { label: '5', value: '5' },
          { label: '6', value: '6' },
          { label: '7', value: '7' },
          { label: '8', value: '8' },
          { label: '9', value: '9' },
            { label: '10', value: '10' }
        ]
      }),
      MCFilter.selectQuickFilter({
        title: 'Status',
        key: 'status',
        options: [
          { label: 'In progress', value: 'In progress' },
          { label: 'Completed', value: 'Completed' },
          { label: 'Cancelled', value: 'Cancelled' },
        ],
        placeholder: 'Select a status'
      }),
      MCFilter.textQuickFilter({
        title: 'Text Quick Filter Field',
        key: 'field',
        options: [{ label: 'Field La bombonera', value: 'Field La bombonera' }],
        placeholder: 'Search a field',
      }),
      MCFilter.autocomplete({
        title: 'Autocomplete Field',
        key: 'field',
        filter: this.onFilterAutocomplete.bind(this),
        placeholder: 'Search a field',
      }),
      MCFilter.multiselect({
        title: 'Multi Select Field',
        key: 'field',
        options: [
          { label: 'Field La bombonera', value: 'Field La bombonera' },
          { label: 'Mostaza', value: 'Mostaza' },
          { label: 'La bombonera', value: 'La bombonera' },
          { label: 'McDonalds', value: 'McDonalds' },
        ],
        placeholder: 'Select fields',
      }),
      MCFilter.select({
        title: 'Select Field',
        key: 'field',
        options: [
          { label: 'Field La bombonera', value: 'Field La bombonera' },
          { label: 'Mostaza', value: 'Mostaza' },
          { label: 'La bombonera', value: 'La bombonera' },
          { label: 'McDonalds', value: 'McDonalds' },
        ],
        placeholder: 'Select a field',
      }),
    ];
  }

  loadTable() {
    this.tableColumns = [
      { field: 'name', title: 'Name', isSortable: true },
      { field: 'game_number', title: 'Game #' },
      { field: 'status', title: 'Status', isShow: true },
      { field: 'field', title: 'Field' },
    ]

    this.tableResponse.data = [
      { name: 'Name 1', game_number: 1, status: 'In progress', field: 'Field La bombonera' },
      { name: 'Name 2', game_number: 2, status: 'Completed', field: 'Mostaza' },
    ]
  }
}
