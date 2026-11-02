import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { CheckboxField, CheckboxFieldComponent } from './checkbox-field.component';

describe('CheckboxFieldComponent', () => {
  let component: CheckboxFieldComponent;
  let fixture: ComponentFixture<CheckboxFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxFieldComponent);
    component = fixture.componentInstance;

    const field = CheckboxField.init('enabled', {
      label: 'Enable Notifications',
      default_value: true,
      extra: { description: 'Receive email alerts' }
    });
    const control = new UntypedFormControl(true);
    const group = new UntypedFormGroup({ enabled: control });

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('control', control);
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
  });

  it('should create and render label and description', () => {
    expect(component).toBeTruthy();
    expect(component.field().config.label).toBe('Enable Notifications');
    expect(fixture.nativeElement.textContent).toContain('Enable Notifications');
    expect(fixture.nativeElement.textContent).toContain('Receive email alerts');
  });
});
