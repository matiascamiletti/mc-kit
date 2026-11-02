import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { StorageMap } from '@ngx-pwa/local-storage';
import { of } from 'rxjs';
import { MCOdataGridLayoutType, MCOdataGridPage } from './odata-grid-page.component';

describe('MCOdataGridPage', () => {
  let component: MCOdataGridPage;
  let fixture: ComponentFixture<MCOdataGridPage>;

  beforeEach(async () => {
    const storageSpy = jasmine.createSpyObj('StorageMap', ['get', 'set', 'delete']);
    storageSpy.get.and.returnValue(of(undefined));
    storageSpy.set.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      imports: [MCOdataGridPage],
      providers: [
        provideNoopAnimations(),
        { provide: StorageMap, useValue: storageSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MCOdataGridPage);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('columns', [{ field: 'id', title: 'ID', isShow: true }]);
    fixture.componentRef.setInput('httpService', {
      list: () => of({ data: [{ id: 1 }], total: 1 })
    });
    fixture.detectChanges();
  });

  it('should create and default to TABLE layout', () => {
    expect(component).toBeTruthy();
    expect(component.layoutType()).toBe(MCOdataGridLayoutType.TABLE);
  });

  it('should switch layout between TABLE and GRID', () => {
    component.changeLayout(MCOdataGridLayoutType.GRID);
    expect(component.layoutType()).toBe(MCOdataGridLayoutType.GRID);

    component.changeLayout(MCOdataGridLayoutType.TABLE);
    expect(component.layoutType()).toBe(MCOdataGridLayoutType.TABLE);
  });
});
