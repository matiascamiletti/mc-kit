import { CommonModule } from '@angular/common';
import { Component, contentChild, contentChildren, inject, input, OnDestroy, OnInit, output, signal, viewChild } from '@angular/core';
import { MCApiRestHttpService, MCColumn, MCListResponse } from '@mckit/core';
import { MCConfigFilter, MCFilterButton, MCFilterOdataConverterService, MCResultFilter } from '@mckit/filter';
import { MCPageHeadingComponent, MCSearchField } from '@mckit/layout-core';
import { MCTable, MCTdTemplateDirective, MCThTemplateDirective, ShowColumnsButton } from '@mckit/table';
import { ConfirmationService, MenuItem, MessageService, SortMeta } from 'primeng/api';
import { catchError, Observable, Subscription, tap } from 'rxjs';
import { MCOdata } from '../../entities/mc-odata';
import { ToastModule } from 'primeng/toast';
import { TablePageEvent, TableRowSelectEvent, TableRowUnSelectEvent } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MCLeftHeaderTemplateDirective } from '../../directives/left-header-template.directive';
import { MCRightHeaderTemplateDirective } from '../../directives/right-header-template.directive';
import { ButtonModule } from 'primeng/button';
import { MCTopContentTemplateDirective } from '../../directives/top-content-template.directive';
import { MCOdataPage } from '../odata-page/odata-page.component';
import { PaginatorModule } from 'primeng/paginator';
import { MCItemGridTemplateDirective } from '../../directives/item-grid-template.directive';


export enum MCOdataGridLayoutType {
  TABLE,
  GRID
}

@Component({
  selector: 'mc-odata-grid-page',
  imports: [CommonModule, MCSearchField, MCFilterButton, ShowColumnsButton, MCTable, MCThTemplateDirective, MCTdTemplateDirective, ToastModule, ConfirmDialogModule, ButtonModule, PaginatorModule],
  templateUrl: './odata-grid-page.component.html',
  styleUrl: './odata-grid-page.component.css',
  providers: [MessageService, ConfirmationService]
})
export class MCOdataGridPage extends MCOdataPage {

  layoutType = signal<MCOdataGridLayoutType>(MCOdataGridLayoutType.TABLE);

  eLayoutType = MCOdataGridLayoutType;

  changeLayout(layout: MCOdataGridLayoutType) {
    this.layoutType.set(layout);
  }

  itemGridTemplate = contentChild(MCItemGridTemplateDirective);

  // Borrar
  //breadcrumb = input<Array<MenuItem>>();
  //title = input<string>();
  //subtitle = input<string>();


}
