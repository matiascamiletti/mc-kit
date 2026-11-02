import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { IftaTextField, IftaTextFieldComponent } from './ifta-text-field.component';

describe('IftaTextFieldComponent', () => {
  let component: IftaTextFieldComponent;
  let fixture: ComponentFixture<IftaTextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IftaTextFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IftaTextFieldComponent);
    component = fixture.componentInstance;

    const field = IftaTextField.init('fullName', 'Full Name', {
      default_value: 'John Doe'
    });
    const control = new UntypedFormControl('John Doe');
    const group = new UntypedFormGroup({ fullName: control });

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('control', control);
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
  });

  it('should create and render label', () => {
    expect(component).toBeTruthy();
    expect(component.field().config.label).toBe('Full Name');
    expect(fixture.nativeElement.textContent).toContain('Full Name');
  });
});
