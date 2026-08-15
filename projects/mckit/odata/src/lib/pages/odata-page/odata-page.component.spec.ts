import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCOdataPage } from './odata-page.component';
import { of } from 'rxjs';

describe('MCOdataPage', () => {
  let component: MCOdataPage;
  let fixture: ComponentFixture<MCOdataPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCOdataPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCOdataPage);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('columns', [{ field: 'id', title: 'ID' }]);
    fixture.componentRef.setInput('httpService', {
      list: () => of({ data: [], total: 0 })
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
