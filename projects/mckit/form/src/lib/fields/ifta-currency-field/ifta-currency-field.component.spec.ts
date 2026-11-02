import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { IftaCurrencyField, IftaCurrencyFieldComponent } from './ifta-currency-field.component';

describe('IftaCurrencyFieldComponent', () => {
  let component: IftaCurrencyFieldComponent;
  let fixture: ComponentFixture<IftaCurrencyFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IftaCurrencyFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IftaCurrencyFieldComponent);
    component = fixture.componentInstance;

    const field = IftaCurrencyField.init('amount', 'Amount', {
      default_value: 50,
      prepended: '$',
      appended: 'USD'
    });
    const control = new UntypedFormControl(50);
    const group = new UntypedFormGroup({ amount: control });

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('control', control);
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
  });

  it('should create and configure currency field', () => {
    expect(component).toBeTruthy();
    expect(component.field().config.label).toBe('Amount');
    expect(component.field().config.prepended).toBe('$');
    expect(component.field().config.appended).toBe('USD');
  });
});
