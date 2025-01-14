import { Component, inject, OnInit } from "@angular/core";
import { MCLoaderService } from "@mckit/loader";
import { StorageMap } from "@ngx-pwa/local-storage";
import { ConfirmationService, MessageService, SortMeta } from "primeng/api";
import { MCOdata } from "../entities/mc-odata";
import { MCApiRestHttpService, MCColumn, MCListResponse } from "@mckit/core";
import { catchError, Observable, Subscription, tap } from "rxjs";
import { TableFilterEvent, TablePageEvent } from "primeng/table";
import { MultiSelectChangeEvent } from "primeng/multiselect";

@Component({
  selector: 'mc-odata-table',
  standalone: true,
  template: '',
})
export abstract class MCOdataTableComponent<T extends { id?: any }> implements OnInit {
  loaderService = inject(MCLoaderService);
  storageService = inject(StorageMap);
  confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService);

  httpService?: MCApiRestHttpService<T>;

  subscriptionList?: Subscription;
  /**
   * Assign table key for save state in localStorage
   */
  tableKey = 'list_default';

  data = new MCOdata();

  columns: Array<MCColumn> = [];
  selectedColumns?: any;

  items?: MCListResponse<T>;

  isLoading = true;
  /**
   * Assign search fields key for search in the table
   */
  searchFieldsKey: Array<string> = [];

  ngOnInit(): void {
    this.loaderService.hide();

    this.selectedColumns = this.columns.filter(column => column.isShow);
    this.loadSelectedColumns(this.tableKey);

    this.loadItems();
  }

  pageChange(event: TablePageEvent) {
    this.data.setPageByPrimeNg(event);
    this.loadItems();
  }

  sort(event: SortMeta) {
    if(event.order == -1){
      this.data.orderBy = event.field + ' desc';
    } else {
      this.data.orderBy = event.field + ' asc';
    }
    this.loadItems();
  }

  filter(event: TableFilterEvent) {
    this.data.filters.setTableFilters(event);
    this.loadItems();
  }

  search(event: any) {
    let query = event.target.value;

    this.data.filters.cleanPostpend();

    if(query == '' || this.searchFieldsKey.length == 0){
      this.loadItems();
      return;
    }

    query = query.replace('+', '%2B');

    let filters: Array<string> = [];
    this.searchFieldsKey.forEach(key => {
      filters.push(`substringof(${key}, '${query}')`);
    });

    this.data.filters.setPostpend(filters.join(' or '));

    this.loadItems();
  }

  requestList(): Observable<MCListResponse<T>> {
    return this.httpService!.list(this.data.toString());
  }

  loadItems() {
    this.isLoading = true;
    if (this.subscriptionList) {
      this.subscriptionList.unsubscribe();
    }

    this.subscriptionList = this.requestList()
    .pipe(
      catchError((data) => {
        this.messageService.add({ severity: 'error', detail: data.error?.message?.message || data.error.message || data.message || 'Unknown error' });
        this.isLoading = false;
        throw data;
      }),
      tap(response => this.items = response),
    )
    .subscribe(() => this.isLoading = false);
  }

  onDelete(id: any) {
    this.httpService?.delete(id).subscribe(() => {
      this.loadItems();
    });
  }

  onRemoveConfirm(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
          this.onDelete(id);
      },
    });
  }

  isColumnSelected(field: string): boolean {
    return this.selectedColumns.some((column: any) => column.field === field);
  }

  columnsChange(event: MultiSelectChangeEvent) {
    this.saveSelectedColumns(this.tableKey);
  }

  saveSelectedColumns(tableKey: string) {
    this.storageService.set(tableKey + '_selected_columns', JSON.stringify(this.selectedColumns), { type: 'string' }).subscribe();
  }

  loadSelectedColumns(tableKey: string) {
    this.storageService.get(tableKey + '_selected_columns', { type: 'string' }).subscribe(data => {
      if (data) {
        this.selectedColumns = JSON.parse(data);
      }
    });
  }

}
