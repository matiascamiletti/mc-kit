import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { StorageMap } from '@ngx-pwa/local-storage';
import { of } from 'rxjs';
import { MCColumn } from '@mckit/core';
import { ShowColumnsButton } from './show-columns-button.component';

describe('ShowColumnsButton', () => {
  let component: ShowColumnsButton;
  let fixture: ComponentFixture<ShowColumnsButton>;
  let storageSpy: jasmine.SpyObj<StorageMap>;
  const mockColumns: Array<MCColumn> = [
    { field: 'id', title: 'ID', isShow: true },
    { field: 'name', title: 'Name', isShow: true },
    { field: 'secret', title: 'Secret', isShow: false }
  ];

  beforeEach(async () => {
    storageSpy = jasmine.createSpyObj('StorageMap', ['get', 'set']);
    storageSpy.get.and.returnValue(of(undefined));
    storageSpy.set.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      imports: [ShowColumnsButton],
      providers: [
        provideNoopAnimations(),
        { provide: StorageMap, useValue: storageSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowColumnsButton);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('initialColumns', mockColumns);
    fixture.componentRef.setInput('key', 'users_table');
    fixture.detectChanges();
  });

  it('should create and filter initial visible columns', () => {
    expect(component).toBeTruthy();
    expect(component.selectedColumns?.length).toBe(2);
    expect(component.getKey()).toBe('users_table_selected_columns');
  });

  it('should load saved columns from storage and emit onSelected', () => {
    const selectedSpy = spyOn(component.onSelected, 'emit');
    storageSpy.get.and.returnValue(of(JSON.stringify([{ field: 'id', title: 'ID' }])));

    component.loadStorage();
    expect(component.selectedColumns?.length).toBe(1);
    expect(component.selectedColumns?.[0].field).toBe('id');
    expect(selectedSpy).toHaveBeenCalledWith(component.selectedColumns!);
  });

  it('should save storage and emit onSelected when columnsChange is called', () => {
    const selectedSpy = spyOn(component.onSelected, 'emit');
    component.columnsChange({ originalEvent: new Event('change'), value: component.selectedColumns });
    expect(storageSpy.set).toHaveBeenCalledWith(
      'users_table_selected_columns',
      JSON.stringify(component.selectedColumns),
      { type: 'string' }
    );
    expect(selectedSpy).toHaveBeenCalled();
  });

  it('should skip storage when hasStorage is false or key is undefined', () => {
    storageSpy.set.calls.reset();
    fixture.componentRef.setInput('hasStorage', false);
    component.saveStorage();
    component.loadStorage();
    expect(storageSpy.set).not.toHaveBeenCalled();
  });
});
