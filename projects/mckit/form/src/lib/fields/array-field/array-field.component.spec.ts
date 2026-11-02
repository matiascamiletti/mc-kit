import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ArrayField, ArrayFieldComponent } from './array-field.component';
import { HiddenField } from '../hidden-field/hidden-field.component';

describe('ArrayFieldComponent', () => {
  let component: ArrayFieldComponent;
  let fixture: ComponentFixture<ArrayFieldComponent>;
  let group: UntypedFormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrayFieldComponent],
      providers: [provideNoopAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrayFieldComponent);
    component = fixture.componentInstance;

    const field = ArrayField.init('items', [HiddenField.init('title', 'DefaultTitle')], {
      labelAddButton: 'Add Item',
      labelTitlePanel: 'Item Panel',
      allow_order: true,
      allow_add: true
    });

    group = new UntypedFormGroup({
      items: new FormArray([])
    });

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
  });

  it('should create and initialize ArrayField config properly', () => {
    expect(component).toBeTruthy();
    expect(component.field().config.is_array).toBeTrue();
    expect(component.field().config.allow_add).toBeTrue();
  });

  it('should add, reorder, and remove rows in formArray', () => {
    component.onClickAdd();
    component.onClickAdd();
    expect(component.formArray().length).toBe(2);

    component.formArray().at(0).get('title')?.setValue('First');
    component.formArray().at(1).get('title')?.setValue('Second');

    component.moveItem(0, 1);
    expect(component.formArray().at(0).get('title')?.value).toBe('Second');
    expect(component.formArray().at(1).get('title')?.value).toBe('First');

    // Out-of-bounds move should do nothing
    component.moveItem(0, -1);
    expect(component.formArray().at(0).get('title')?.value).toBe('Second');

    component.onClickRemove(0);
    expect(component.formArray().length).toBe(1);
    expect(component.formArray().at(0).get('title')?.value).toBe('First');
  });

  it('should create FormArray if group control is not already a FormArray', () => {
    group.setControl('items', new UntypedFormControl(null));
    component.onClickAdd();
    expect(group.get('items') instanceof FormArray).toBeTrue();
    expect((group.get('items') as FormArray).length).toBe(1);
  });
});
