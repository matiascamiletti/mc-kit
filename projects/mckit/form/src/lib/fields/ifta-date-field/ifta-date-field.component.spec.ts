import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { IftaDateField, IftaDateFieldComponent } from './ifta-date-field.component';

describe('IftaDateFieldComponent', () => {
  let component: IftaDateFieldComponent;
  let fixture: ComponentFixture<IftaDateFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IftaDateFieldComponent],
      providers: [provideNoopAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IftaDateFieldComponent);
    component = fixture.componentInstance;

    const field = IftaDateField.init('startDate', 'Start Date', {
      date_format: 'dd/mm/yy'
    });
    const control = new UntypedFormControl(null);
    const group = new UntypedFormGroup({ startDate: control });

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('control', control);
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
  });

  it('should create and set date_format', () => {
    expect(component).toBeTruthy();
    expect(component.field().config.label).toBe('Start Date');
    expect(component.field().config.date_format).toBe('dd/mm/yy');

    const defaultFormatField = IftaDateField.init('endDate', 'End Date');
    expect(defaultFormatField.config.date_format).toBe('yy-mm-dd');
  });
});
