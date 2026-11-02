import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { IftaSelectField, IftaSelectFieldComponent } from './ifta-select-field.component';

describe('IftaSelectFieldComponent', () => {
  let component: IftaSelectFieldComponent;
  let fixture: ComponentFixture<IftaSelectFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IftaSelectFieldComponent],
      providers: [provideNoopAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IftaSelectFieldComponent);
    component = fixture.componentInstance;

    const options = [{ code: 'US', name: 'United States' }];
    const field = IftaSelectField.init('country', 'Country', options, 'name', 'code');
    const control = new UntypedFormControl('US');
    const group = new UntypedFormGroup({ country: control });

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('control', control);
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
  });

  it('should create and configure select options', () => {
    expect(component).toBeTruthy();
    expect(component.field().config.options.length).toBe(1);
    expect(component.field().config.optionLabel).toBe('name');
    expect(component.field().config.optionValue).toBe('code');
  });
});
