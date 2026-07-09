import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepButtonsFieldComponent } from './step-buttons-field.component';

describe('StepButtonsFieldComponent', () => {
  let component: StepButtonsFieldComponent;
  let fixture: ComponentFixture<StepButtonsFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepButtonsFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepButtonsFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
