import { CommonModule } from '@angular/common';
import { Component, contentChild, contentChildren, inject, input, OnDestroy, OnInit, signal, viewChild } from '@angular/core';
import { MCApiRestHttpService, MCColumn, MCListResponse } from '@mckit/core';
import { MCConfigFilter, MCFilterButton, MCFilterOdataConverterService, MCResultFilter } from '@mckit/filter';
import { MCPageHeadingComponent, MCSearchField } from '@mckit/layout-core';
import { MCTable, MCTdTemplateDirective, MCThTemplateDirective, ShowColumnsButton } from '@mckit/table';
import { ConfirmationService, MenuItem, MessageService, SortMeta } from 'primeng/api';
import { catchError, Observable, Subscription, tap } from 'rxjs';
import { MCOdata } from '../../entities/mc-odata';
import { ToastModule } from 'primeng/toast';
import { TablePageEvent } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MCLeftHeaderTemplateDirective } from '../../directives/left-header-template.directive';
import { MCRightHeaderTemplateDirective } from '../../directives/right-header-template.directive';


@Component({
  selector: 'mc-odata-page',
  imports: [CommonModule, MCPageHeadingComponent, MCSearchField, MCFilterButton, ShowColumnsButton, MCTable, MCThTemplateDirective, MCTdTemplateDirective, ToastModule, ConfirmDialogModule],
  templateUrl: './odata-page.component.html',
  styleUrl: './odata-page.component.css',
  providers: [MessageService, ConfirmationService]

})
export class MCOdataPage implements OnInit, OnDestroy {
  breadcrumb = input<Array<MenuItem>>();

  title = input<string>();
  subtitle = input<string>();

  key = input<string>();

  hasSearch = input<boolean>(true);

  searchField = viewChild(MCSearchField);
  searchFieldsKey = input<Array<string>>();

  filters = input<MCConfigFilter>();

  columns = input.required<Array<MCColumn>>();
  hasEditColumns = input<boolean>(true);
  selectedColumns = signal<Array<MCColumn>>([]);

  hasPagination = input<boolean>(true);

  thTemplates = contentChildren(MCThTemplateDirective);
  tdTemplates = contentChildren(MCTdTemplateDirective);

  httpService = input.required<MCApiRestHttpService<any>>();

  data = new MCOdata();
  odataConverter = inject(MCFilterOdataConverterService);

  subscriptionList?: Subscription;

  items = signal<MCListResponse<any>>(new MCListResponse<any>());

  isLoading = signal<boolean>(true);

  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);

  sortField = signal<string|undefined>(undefined);
  sortOrder = signal<number>(-1);

  leftHeaderTemplate = contentChild(MCLeftHeaderTemplateDirective);
  rightHeaderTemplate = contentChild(MCRightHeaderTemplateDirective);

  ngOnInit(): void {
    this.initialSort();
  }

  ngOnDestroy(): void {
    this.subscriptionList?.unsubscribe();
  }

  onPage(event: TablePageEvent) {
    this.data.setPageByPrimeNg(event);
    this.loadItems();
  }

  initialSort() {
    let column = this.columns().find((column: MCColumn) => column.isSortDefault);
    if(column == undefined){
      return;
    }

    this.sortField.set(column.field);
    this.sortOrder.set(column.isSortDescDefault ? -1 : 1);
  }

  onSort(event: SortMeta) {
    this.data.cleanPage();

    this.sortField.set(event.field);
    if(event.order == -1){
      this.sortOrder.set(-1);
      this.data.orderBy = event.field + ' desc';
    } else {
      this.sortOrder.set(1);
      this.data.orderBy = event.field + ' asc';
    }
    this.loadItems();
  }

  onSearch(query: string) {
    this.data.filters.cleanPostpend();
    this.data.cleanPage();

    if(query == '' || this.searchFieldsKey()?.length == 0){
      this.loadItems();
      return;
    }

    query = query.replace('+', '%2B');

    let filters: Array<string> = [];
    this.searchFieldsKey()?.forEach(key => {
      filters.push(`substringof(${key}, '${query}')`);
    });

    if(filters.length == 0){
      return;
    }

    this.data.filters.setPostpend(filters.join(' or '));

    this.loadItems();
  }

  onFilter(filters: Array<MCResultFilter>) {
    let filterOdata = this.odataConverter.convert(filters);

    this.data.filters.cleanOdata();
    this.data.filters.setOdata(filterOdata);

    this.loadItems();
  }

  onChangeColumns(columns: Array<MCColumn>) {
    let filtered = this.columns().filter((column: MCColumn) => columns.some((c: MCColumn) => c.field === column.field));
    this.selectedColumns.set(filtered);
  }

  onDelete(id: any) {
    this.httpService()?.delete(id).subscribe(() => {
      this.loadItems();
    });
  }

  requestList(): Observable<MCListResponse<any>> {
    return this.httpService().list(this.data.toString());
  }

  loadItems() {
    this.isLoading.set(true);
    this.subscriptionList?.unsubscribe();

    this.subscriptionList = this.requestList()
    .pipe(
      catchError((data) => {
        this.messageService.add({ severity: 'error', summary: 'An error has occurred', detail: data.error?.message?.message || data.error.message || data.message || 'Unknown error' });
        this.searchField()?.stopLoading();
        this.isLoading.set(false);
        throw data;
      }),
      tap(response => this.items.set(response)),
      tap(response => this.searchField()?.stopLoading())
    )
    .subscribe(() => this.isLoading.set(false));
  }

  onClickRemove(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => { this.onDelete(id); },
    });
  }
}
