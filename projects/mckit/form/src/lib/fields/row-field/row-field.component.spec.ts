import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { RowField, RowFieldComponent } from './row-field.component';
import { HiddenField } from '../hidden-field/hidden-field.component';

describe('RowFieldComponent', () => {
  let component: RowFieldComponent;
  let fixture: ComponentFixture<RowFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowFieldComponent);
    component = fixture.componentInstance;

    const field = RowField.init([HiddenField.init('first'), HiddenField.init('second')], {
      itemClasses: ['w-1/2']
    });
    const group = new UntypedFormGroup({
      first: new UntypedFormControl('1'),
      second: new UntypedFormControl('2')
    });

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
  });

  it('should create and compute item classes properly', () => {
    expect(component).toBeTruthy();
    expect(component.getItemClasses(0)).toBe('w-1/2');
    expect(component.getItemClasses(5)).toBe('');

    const fieldWithoutClasses = RowField.init([HiddenField.init('first')]);
    fixture.componentRef.setInput('field', fieldWithoutClasses);
    expect(component.getItemClasses(0)).toBe('');
  });

  it('should support RowField.initWithGroup', () => {
    const groupField = RowField.initWithGroup('subRow', [HiddenField.init('first')]);
    expect(groupField.key).toBe('subRow');
    expect(groupField.config.is_new_group).toBeTrue();
  });
});
