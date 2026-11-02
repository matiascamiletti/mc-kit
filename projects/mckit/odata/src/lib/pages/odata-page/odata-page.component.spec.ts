import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { StorageMap } from '@ngx-pwa/local-storage';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { MCOdataPage } from './odata-page.component';
import { MCFilter, MCConditionResult, MCResultFilter } from '@mckit/filter';
import { MCLoaderService } from '@mckit/loader';
import { MCOdataTableComponent } from '../../components/odata-table.component';
import { MCOdataSignalTableComponent } from '../../components/odata-signal-table.component';

@Component({
  selector: 'test-concrete-odata-table',
  standalone: true,
  template: ''
})
class ConcreteOdataTableComponent extends MCOdataTableComponent<{ id: number; name: string }> {}

@Component({
  selector: 'test-concrete-odata-signal-table',
  standalone: true,
  template: ''
})
class ConcreteOdataSignalTableComponent extends MCOdataSignalTableComponent<{ id: number; name: string }> {}

describe('MCOdataPage & Table Base Components', () => {
  let component: MCOdataPage;
  let fixture: ComponentFixture<MCOdataPage>;
  let mockHttpService: any;
  let storageSpy: jasmine.SpyObj<StorageMap>;

  beforeEach(async () => {
    storageSpy = jasmine.createSpyObj('StorageMap', ['get', 'set', 'delete']);
    storageSpy.get.and.returnValue(of(undefined));
    storageSpy.set.and.returnValue(of(undefined));

    mockHttpService = {
      list: jasmine.createSpy('list').and.returnValue(of({ data: [{ id: 1, name: 'Row 1' }], total: 1 })),
      delete: jasmine.createSpy('delete').and.returnValue(of({}))
    };

    await TestBed.configureTestingModule({
      imports: [MCOdataPage, ConcreteOdataTableComponent, ConcreteOdataSignalTableComponent],
      providers: [
        provideNoopAnimations(),
        { provide: StorageMap, useValue: storageSpy },
        MCLoaderService,
        ConfirmationService,
        MessageService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MCOdataPage);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('columns', [
      { field: 'id', title: 'ID', isShow: true, isSortDefault: true, isSortDescDefault: true },
      { field: 'name', title: 'Name', isShow: true }
    ]);
    fixture.componentRef.setInput('searchFieldsKey', ['name']);
    fixture.componentRef.setInput('httpService', mockHttpService);
    fixture.detectChanges();
  });

  it('should create and initialize default sort', () => {
    expect(component).toBeTruthy();
    expect(component.sortField()).toBe('id');
    expect(component.sortOrder()).toBe(-1);
  });

  it('should handle pagination, sorting, searching, and filtering', () => {
    component.onPage({ first: 10, rows: 10 });
    expect(component.data.skip).toBe(10);
    expect(mockHttpService.list).toHaveBeenCalled();

    component.onPageOnly({ first: 20, rows: 10 });
    expect(component.data.skip).toBe(20);

    component.onSort({ field: 'name', order: 1 });
    expect(component.sortField()).toBe('name');
    expect(component.sortOrder()).toBe(1);
    expect(component.data.orderBy).toBe('name asc');

    component.onSort({ field: 'name', order: -1 });
    expect(component.sortOrder()).toBe(-1);
    expect(component.data.orderBy).toBe('name desc');

    component.onSearch('alice+bob');
    expect(component.data.filters.postpend).toBe("contains(name, 'alice%2Bbob')");

    component.onSearch('');
    expect(component.data.filters.postpend).toBeUndefined();

    const rf = new MCResultFilter();
    rf.filter = MCFilter.text({ title: 'Name', key: 'name' });
    rf.condition = MCConditionResult.EQUALS;
    rf.value = 'Alice';
    component.onFilter([rf]);
    expect(component.data.filters.odata).toBe("name eq 'Alice'");
  });

  it('should handle column changes, delete, row events, and toggleMoreOptions', () => {
    component.onChangeColumns([{ field: 'id', title: 'ID' }]);
    expect(component.selectedColumns().length).toBe(1);

    component.onDelete(5);
    expect(mockHttpService.delete).toHaveBeenCalledWith(5);

    const confirmSpy = spyOn(component.confirmationService, 'confirm').and.callFake((opts: any) => opts.accept());
    component.onClickRemove(9);
    expect(confirmSpy).toHaveBeenCalled();
    expect(mockHttpService.delete).toHaveBeenCalledWith(9);

    expect(component.isShowMoreOptions()).toBeFalse();
    component.toggleMoreOptions();
    expect(component.isShowMoreOptions()).toBeTrue();

    const selectSpy = spyOn(component.onRowSelect, 'emit');
    const unselectSpy = spyOn(component.onRowUnselect, 'emit');
    const clickSpy = spyOn(component.onRowClick, 'emit');

    component.onRowSelectChange({ originalEvent: new Event('click'), data: { id: 1 } });
    expect(selectSpy).toHaveBeenCalled();

    component.onRowUnselectChange({ originalEvent: new Event('click'), data: { id: 1 } });
    expect(unselectSpy).toHaveBeenCalled();

    component.onRowClickChange({ id: 1 });
    expect(clickSpy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should test MCOdataTableComponent and MCOdataSignalTableComponent methods', () => {
    const tableFixture = TestBed.createComponent(ConcreteOdataTableComponent);
    const tableComp = tableFixture.componentInstance;
    tableComp.httpService = mockHttpService;
    tableComp.columns = [{ field: 'id', title: 'ID', isShow: true }];
    tableComp.searchFieldsKey = ['name'];
    tableFixture.detectChanges();

    expect(tableComp.isColumnSelected('id')).toBeTrue();
    tableComp.pageChange({ first: 0, rows: 10 });
    tableComp.sort({ field: 'id', order: -1 });
    tableComp.sort({ field: 'id', order: 1 });
    tableComp.filter({ filters: {} });
    tableComp.search({ target: { value: 'query' } });
    tableComp.search({ target: { value: '' } });
    tableComp.columnsChange({ originalEvent: new Event('change'), value: [] });
    tableComp.onDelete(1);

    const sigFixture = TestBed.createComponent(ConcreteOdataSignalTableComponent);
    const sigComp = sigFixture.componentInstance;
    sigComp.httpService = mockHttpService;
    sigComp.columns = [{ field: 'id', title: 'ID', isShow: true }];
    sigComp.searchFieldsKey = ['name'];
    sigFixture.detectChanges();

    expect(sigComp.isColumnSelected('id')).toBeTrue();
    sigComp.pageChange({ first: 0, rows: 10 });
    sigComp.sort({ field: 'id', order: -1 });
    sigComp.sort({ field: 'id', order: 1 });
    sigComp.filter({ filters: {} });
    sigComp.search({ target: { value: 'query' } });
    sigComp.search({ target: { value: '' } });
    sigComp.columnsChange({ originalEvent: new Event('change'), value: [] });
    sigComp.onDelete(1);
  });
});
