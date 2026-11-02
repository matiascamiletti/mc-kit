import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ConditionalFuncField, ConditionalFuncFieldComponent } from './conditional-func-field.component';
import { HiddenField } from '../hidden-field/hidden-field.component';

describe('ConditionalFuncFieldComponent', () => {
  let component: ConditionalFuncFieldComponent;
  let fixture: ComponentFixture<ConditionalFuncFieldComponent>;
  let group: UntypedFormGroup;
  let childControl: UntypedFormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionalFuncFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionalFuncFieldComponent);
    component = fixture.componentInstance;

    const field = ConditionalFuncField.init(
      (values: any) => values.age >= 18,
      [HiddenField.init('driverLicense')]
    );
    childControl = new UntypedFormControl('DL-123');
    group = new UntypedFormGroup({
      age: new UntypedFormControl(16),
      driverLicense: childControl
    });

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('control', childControl);
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
  });

  it('should create and evaluate conditionalFunc on init and valueChanges', () => {
    expect(component).toBeTruthy();
    expect(component.isShow()).toBeFalse();
    expect(childControl.value).toBeNull();

    group.get('age')?.setValue(21);
    expect(component.isShow()).toBeTrue();

    group.get('age')?.setValue(12);
    expect(component.isShow()).toBeFalse();
  });
});
