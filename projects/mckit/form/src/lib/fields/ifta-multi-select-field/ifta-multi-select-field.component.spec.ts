import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { IftaMultiSelectField, IftaMultiSelectFieldComponent } from './ifta-multi-select-field.component';

describe('IftaMultiSelectFieldComponent', () => {
  let component: IftaMultiSelectFieldComponent;
  let fixture: ComponentFixture<IftaMultiSelectFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IftaMultiSelectFieldComponent],
      providers: [provideNoopAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IftaMultiSelectFieldComponent);
    component = fixture.componentInstance;

    const options = [{ id: 1, label: 'Option 1' }, { id: 2, label: 'Option 2' }];
    const field = IftaMultiSelectField.init('tags', 'Tags', options, 'label', 'id', {
      classes: 'w-full'
    });
    const control = new UntypedFormControl([1]);
    const group = new UntypedFormGroup({ tags: control });

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('control', control);
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
  });

  it('should create and configure options', () => {
    expect(component).toBeTruthy();
    expect(component.field().config.options.length).toBe(2);
    expect(component.field().config.optionLabel).toBe('label');
    expect(component.field().config.optionValue).toBe('id');
  });
});
