import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { IftaMultiSelectObsField, IftaMultiSelectObsFieldComponent } from './ifta-multi-select-obs-field.component';

describe('IftaMultiSelectObsFieldComponent', () => {
  let component: IftaMultiSelectObsFieldComponent;
  let fixture: ComponentFixture<IftaMultiSelectObsFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IftaMultiSelectObsFieldComponent],
      providers: [provideNoopAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IftaMultiSelectObsFieldComponent);
    component = fixture.componentInstance;

    const options = [{ id: 10, name: 'Cat A' }, { id: 20, name: 'Cat B' }];
    const field = IftaMultiSelectObsField.init(
      'categories',
      'Categories',
      () => of(options),
      'name',
      'id'
    );
    const control = new UntypedFormControl([10]);
    const group = new UntypedFormGroup({ categories: control });

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('control', control);
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
  });

  it('should create and load options from observable', () => {
    expect(component).toBeTruthy();
    expect(component.options().length).toBe(2);
    expect(component.isLoading()).toBeFalse();
  });
});
