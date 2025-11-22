import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IftaDateFieldComponent } from './ifta-date-field.component';

describe('IftaDateFieldComponent', () => {
  let component: IftaDateFieldComponent;
  let fixture: ComponentFixture<IftaDateFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IftaDateFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IftaDateFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
