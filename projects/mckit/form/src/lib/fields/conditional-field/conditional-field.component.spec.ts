import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ConditionalField, ConditionalFieldComponent } from './conditional-field.component';
import { HiddenField } from '../hidden-field/hidden-field.component';

describe('ConditionalFieldComponent', () => {
  let component: ConditionalFieldComponent;
  let fixture: ComponentFixture<ConditionalFieldComponent>;
  let group: UntypedFormGroup;
  let childControl: UntypedFormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionalFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionalFieldComponent);
    component = fixture.componentInstance;

    const field = ConditionalField.init('role', 'admin', [HiddenField.init('secretKey')]);
    childControl = new UntypedFormControl('initialSecret');
    group = new UntypedFormGroup({
      role: new UntypedFormControl('user'),
      secretKey: childControl
    });

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('control', childControl);
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
  });

  it('should create and hide when condition does not match', () => {
    expect(component).toBeTruthy();
    expect(component.isShow()).toBeFalse();
    expect(childControl.value).toBeNull();
  });

  it('should show when condition matches scalar or array value', () => {
    group.get('role')?.setValue('admin');
    expect(component.isShow()).toBeTrue();

    const arrayField = ConditionalField.init('role', ['admin', 'manager'], [HiddenField.init('secretKey')]);
    fixture.componentRef.setInput('field', arrayField);
    component.verifyCondition({ role: 'manager' });
    expect(component.isShow()).toBeTrue();

    component.verifyCondition({ role: 'guest' });
    expect(component.isShow()).toBeFalse();
  });
});
