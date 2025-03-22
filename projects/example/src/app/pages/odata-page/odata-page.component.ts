import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MCOdataPage } from '../../../../../mckit/odata/src/public-api';
import { MenuItem } from 'primeng/api';
import { MCConfigFilter, MCFilter, MCItemFilter } from '../../../../../mckit/filter/src/public-api';
import { Observable, of } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { MCActionsColumn, MCTdTemplateDirective, MCThTemplateDirective } from '@mckit/table';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-odata-page',
  imports: [CommonModule, MCOdataPage, ButtonModule, MCThTemplateDirective, MCTdTemplateDirective, MCActionsColumn],
  templateUrl: './odata-page.component.html',
  styleUrl: './odata-page.component.scss'
})
export class OdataPageComponent implements OnInit {

  breadcrumb: MenuItem[] = [
      { label: 'Home', routerLink: '/' },
      { label: 'Users' }
  ];

  testService = inject(TestService);

  filters = new MCConfigFilter();

  columns = [
    { field: 'name', title: 'Name', isSortable: true },
    { field: 'game_number', title: 'Game #' },
    { field: 'status', title: 'Status', isShow: true },
    { field: 'field', title: 'Field' },
    { field: 'actions', title: 'Actions' },
  ];

  searchFieldsKey = ['name'];

  ngOnInit(): void {
    this.loadFilterConfig();
  }

  loadFilterConfig() {
      this.filters.filters = [
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
        }),
        MCFilter.autocomplete({
          title: 'Autocomplete Field',
          key: 'field',
          filter: this.onFilterAutocomplete.bind(this),
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
        }),
      ];
    }

  onFilterAutocomplete(query: string): Observable<Array<MCItemFilter>> {
      return of([
        { label: 'Field La bombonera', value: 'Field La bombonera' },
        { label: 'Mostaza', value: 'Mostaza' },
        { label: 'La bombonera', value: 'La bombonera' },
        { label: 'McDonalds', value: 'McDonalds' },
      ]);
    }
}
