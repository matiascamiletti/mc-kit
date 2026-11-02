import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ColumnField, ColumnFieldComponent } from './column-field.component';
import { HiddenField } from '../hidden-field/hidden-field.component';

describe('ColumnFieldComponent', () => {
  let component: ColumnFieldComponent;
  let fixture: ComponentFixture<ColumnFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnFieldComponent);
    component = fixture.componentInstance;

    const field = ColumnField.init([HiddenField.init('colItem', 'val')], {
      classes: 'col-span-6',
      containerFieldClass: 'mb-4'
    });
    const group = new UntypedFormGroup({
      colItem: new UntypedFormControl('val')
    });

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
  });

  it('should create and configure ColumnField properly', () => {
    expect(component).toBeTruthy();
    expect(component.field().config.has_children).toBeTrue();
    expect(component.field().config.is_new_group).toBeFalse();
    expect(component.field().config.classes).toBe('col-span-6');
  });
});
