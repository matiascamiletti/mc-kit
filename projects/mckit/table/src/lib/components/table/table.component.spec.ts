import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MCColumn } from '@mckit/core';
import { MCTable } from './table.component';
import { MCThTemplateDirective } from '../../directives/th-template.directive';
import { MCTdTemplateDirective } from '../../directives/td-template.directive';

@Component({
  standalone: true,
  imports: [MCTable, MCThTemplateDirective, MCTdTemplateDirective],
  template: `
    <mc-table [columns]="columns" [response]="response">
      <ng-template [mcThTemplate]="'name'">Custom TH</ng-template>
      <ng-template [mcTdTemplate]="'name'" let-row>{{ row.name }}!</ng-template>
    </mc-table>
  `
})
class TestHostTableComponent {
  table = viewChild.required(MCTable);
  columns: Array<MCColumn> = [
    { field: 'id', title: 'ID', isShow: true, isSortable: true },
    { field: 'name', title: 'Name', isShow: true },
    { field: 'hidden', title: 'Hidden', isShow: false }
  ];
  response = {
    data: [{ id: 1, name: 'Alice' }],
    total: 1,
    per_page: 10
  };
}

describe('MCTable', () => {
  let component: MCTable;
  let fixture: ComponentFixture<MCTable>;
  const mockColumns: Array<MCColumn> = [
    { field: 'id', title: 'ID', isShow: true, isSortable: true },
    { field: 'hidden', title: 'Hidden', isShow: false }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCTable, TestHostTableComponent],
      providers: [provideNoopAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(MCTable);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('columns', mockColumns);
    fixture.detectChanges();
  });

  it('should create and filter printed columns', () => {
    expect(component).toBeTruthy();
    expect(component.columnsPrinted().length).toBe(1);
    expect(component.columnsPrinted()[0].field).toBe('id');
    expect(component.items()).toEqual([]);
  });

  it('should emit sort, page, row select, row unselect, and row click events', () => {
    const sortSpy = spyOn(component.onSort, 'emit');
    const pageSpy = spyOn(component.onPage, 'emit');
    const selectSpy = spyOn(component.onRowSelect, 'emit');
    const unselectSpy = spyOn(component.onRowUnselect, 'emit');
    const clickSpy = spyOn(component.onRowClick, 'emit');

    component.customSort({});
    component.onSortChange({ field: 'id', order: 1 });
    expect(sortSpy).toHaveBeenCalledWith({ field: 'id', order: 1 });

    component.onPageChange({ first: 0, rows: 10 });
    expect(pageSpy).toHaveBeenCalledWith({ first: 0, rows: 10 });

    const selectEvent = { originalEvent: new Event('click'), data: { id: 1 } };
    component.onRowSelectChange(selectEvent);
    expect(selectSpy).toHaveBeenCalledWith(selectEvent);

    const unselectEvent = { originalEvent: new Event('click'), data: { id: 1 } };
    component.onRowUnselectChange(unselectEvent);
    expect(unselectSpy).toHaveBeenCalledWith(unselectEvent);

    component.onClickRow({ id: 1 });
    expect(clickSpy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should detect and render projected th and td templates', () => {
    const hostFixture = TestBed.createComponent(TestHostTableComponent);
    hostFixture.detectChanges();
    const tableInstance = hostFixture.componentInstance.table();

    expect(tableInstance.isThTemplate('name')).toBeTrue();
    expect(tableInstance.isThTemplate('id')).toBeFalse();
    expect(tableInstance.getThTemplate('name')).toBeTruthy();
    expect(tableInstance.getThTemplate('id')).toBeNull();

    expect(tableInstance.isTdTemplate('name')).toBeTrue();
    expect(tableInstance.isTdTemplate('id')).toBeFalse();
    expect(tableInstance.getTdTemplate('name')).toBeTruthy();
    expect(tableInstance.getTdTemplate('id')).toBeNull();
  });
});
