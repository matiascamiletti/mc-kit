import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { GroupField, GroupFieldComponent } from './group-field.component';
import { HiddenField } from '../hidden-field/hidden-field.component';
import { MCField } from '../../entities/mc-field';

describe('GroupFieldComponent', () => {
  let component: GroupFieldComponent;
  let fixture: ComponentFixture<GroupFieldComponent>;
  let group: UntypedFormGroup;
  let subGroup: UntypedFormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupFieldComponent);
    component = fixture.componentInstance;

    const field = GroupField.init('address', [HiddenField.init('city', 'Buenos Aires')]);
    subGroup = new UntypedFormGroup({
      city: new UntypedFormControl('Buenos Aires')
    });
    group = new UntypedFormGroup({
      address: subGroup
    });

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
  });

  it('should create and return nested group via newGroup()', () => {
    expect(component).toBeTruthy();
    expect(component.newGroup()).toBe(subGroup);
  });

  it('should return undefined from newGroup() if is_new_group is false', () => {
    const nonGroupField = MCField.initCustom('address', GroupFieldComponent, {
      is_new_group: false,
      fields: []
    });
    fixture.componentRef.setInput('field', nonGroupField);
    fixture.detectChanges();
    expect(component.newGroup()).toBeUndefined();
  });
});
