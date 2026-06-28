import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IftaMultiSelectObsFieldComponent } from './ifta-multi-select-obs-field.component';

describe('IftaMultiSelectObsFieldComponent', () => {
  let component: IftaMultiSelectObsFieldComponent;
  let fixture: ComponentFixture<IftaMultiSelectObsFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IftaMultiSelectObsFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IftaMultiSelectObsFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
