import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IftaMultiSelectFieldComponent } from './ifta-multi-select-field.component';

describe('IftaMultiSelectFieldComponent', () => {
  let component: IftaMultiSelectFieldComponent;
  let fixture: ComponentFixture<IftaMultiSelectFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IftaMultiSelectFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IftaMultiSelectFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
