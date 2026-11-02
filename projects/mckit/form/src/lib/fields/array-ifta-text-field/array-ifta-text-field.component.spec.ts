import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormControl, UntypedFormGroup } from '@angular/forms';
import { ArrayIftaTextField, ArrayIftaTextFieldComponent } from './array-ifta-text-field.component';

describe('ArrayIftaTextFieldComponent', () => {
  let component: ArrayIftaTextFieldComponent;
  let fixture: ComponentFixture<ArrayIftaTextFieldComponent>;
  let group: UntypedFormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrayIftaTextFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrayIftaTextFieldComponent);
    component = fixture.componentInstance;

    const field = ArrayIftaTextField.init('params', {
      labelAddButton: 'Add Param',
      labelTitlePanel: 'Parameters'
    });

    group = new UntypedFormGroup({
      params: new FormArray<FormControl<string | null>>([])
    });

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
  });

  it('should create and initialize ArrayIftaTextField', () => {
    expect(component).toBeTruthy();
    expect(component.field().config.is_array_string).toBeTrue();
    expect(component.field().config.labelAddButton).toBe('Add Param');
  });

  it('should add and remove string controls', () => {
    component.onClickAdd();
    component.onClickAdd();
    expect(component.formArray().length).toBe(2);

    component.formArray().at(0).setValue('val1');
    component.onClickRemove(0);
    expect(component.formArray().length).toBe(1);
  });
});
