import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { IftaSubSelectFieldComponent, IftaSubSelectObsField } from './ifta-sub-select-field.component';

describe('IftaSubSelectFieldComponent', () => {
  let component: IftaSubSelectFieldComponent;
  let fixture: ComponentFixture<IftaSubSelectFieldComponent>;
  let parentControl: UntypedFormControl;
  let childControl: UntypedFormControl;
  let group: UntypedFormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IftaSubSelectFieldComponent],
      providers: [provideNoopAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IftaSubSelectFieldComponent);
    component = fixture.componentInstance;

    const field = IftaSubSelectObsField.init(
      'cityId',
      'City',
      'countryId',
      (countryId: any) => of([{ id: countryId * 10, name: `City of ${countryId}` }]),
      'name',
      'id'
    );

    parentControl = new UntypedFormControl(1);
    childControl = new UntypedFormControl(null);
    group = new UntypedFormGroup({
      countryId: parentControl,
      cityId: childControl
    });

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('control', childControl);
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
  });

  it('should create and load options when parentKey has initial value and when parentKey changes', () => {
    expect(component).toBeTruthy();
    expect(component.options()).toEqual([{ id: 10, name: 'City of 1' }]);

    parentControl.setValue(2);
    expect(component.options()).toEqual([{ id: 20, name: 'City of 2' }]);
  });
});
