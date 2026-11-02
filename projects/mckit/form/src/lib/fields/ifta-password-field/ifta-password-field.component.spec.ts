import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { IftaPasswordField, IftaPasswordFieldComponent } from './ifta-password-field.component';

describe('IftaPasswordFieldComponent', () => {
  let component: IftaPasswordFieldComponent;
  let fixture: ComponentFixture<IftaPasswordFieldComponent>;
  let control: UntypedFormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IftaPasswordFieldComponent],
      providers: [provideNoopAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IftaPasswordFieldComponent);
    component = fixture.componentInstance;

    const field = IftaPasswordField.init('password', 'Password', {
      extra: { feedback: false }
    });
    control = new UntypedFormControl('');
    const group = new UntypedFormGroup({ password: control });

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('control', control);
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
  });

  it('should create and generate random password on generatePassword()', () => {
    expect(component).toBeTruthy();
    expect(control.value).toBe('');

    component.generatePassword();
    expect(control.value.length).toBe(16);
    expect(control.dirty).toBeTrue();
  });
});
