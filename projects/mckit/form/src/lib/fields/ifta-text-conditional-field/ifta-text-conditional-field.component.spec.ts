import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { IftaTextConditionalField, IftaTextConditionalFieldComponent } from './ifta-text-conditional-field.component';

describe('IftaTextConditionalFieldComponent', () => {
  let component: IftaTextConditionalFieldComponent;
  let fixture: ComponentFixture<IftaTextConditionalFieldComponent>;
  let control: UntypedFormControl;
  let group: UntypedFormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IftaTextConditionalFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IftaTextConditionalFieldComponent);
    component = fixture.componentInstance;

    const field = IftaTextConditionalField.init(
      'customReason',
      'Custom Reason',
      'reasonType',
      'other'
    );

    control = new UntypedFormControl('initial text');
    group = new UntypedFormGroup({
      reasonType: new UntypedFormControl('standard'),
      customReason: control
    });

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('control', control);
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
  });

  it('should create, hide and clear control when condition does not match, and show when it matches', () => {
    expect(component).toBeTruthy();
    expect(component.isShow()).toBeFalse();
    expect(control.value).toBeNull();

    group.get('reasonType')?.setValue('other');
    expect(component.isShow()).toBeTrue();
  });
});
