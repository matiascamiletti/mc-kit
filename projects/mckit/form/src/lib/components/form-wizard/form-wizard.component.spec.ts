import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCFormWizard } from './form-wizard.component';
import { MCConfigFormWizard } from '../../entities/mc-config-form-wizard';
import { HiddenField } from '../../fields/hidden-field/hidden-field.component';
import { MCEventForm } from '../../entities/mc-event-form';

describe('MCFormWizard', () => {
  let component: MCFormWizard;
  let fixture: ComponentFixture<MCFormWizard>;
  let wizardConfig: MCConfigFormWizard;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCFormWizard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCFormWizard);
    component = fixture.componentInstance;

    wizardConfig = {
      steps: [
        { title: 'Step 1', fields: [HiddenField.init('firstName')] },
        { title: 'Step 2', fields: [HiddenField.init('lastName')] }
      ],
      item: { firstName: 'John', lastName: 'Doe' }
    };
    fixture.componentRef.setInput('config', wizardConfig);
    fixture.detectChanges();
  });

  it('should create and compute steps with StepButtonsField appended', () => {
    expect(component).toBeTruthy();
    expect(component.steps().length).toBe(2);
    expect(component.steps()[0].fields.some(f => f.key === 'step-buttons')).toBeTrue();
  });

  it('should handle step-next, step-back, submit, and custom events', () => {
    const emitted: MCEventForm[] = [];
    component.onEvent.subscribe(ev => emitted.push(ev));

    const stepper = component.wizardStepper();
    if (stepper) {
      spyOn(stepper, 'updateValue');
    }

    component.onEventForm(MCEventForm.init('step-next', 0));
    if (stepper) {
      expect(stepper.updateValue).toHaveBeenCalledWith(2);
    }

    component.onEventForm(MCEventForm.init('step-back', 1));
    if (stepper) {
      expect(stepper.updateValue).toHaveBeenCalledWith(1);
    }

    component.onEventForm(MCEventForm.init('submit', {}));
    expect(emitted.length).toBe(1);
    expect(emitted[0].key).toBe('submit');
    expect(emitted[0].content).toEqual(jasmine.objectContaining({ firstName: 'John', lastName: 'Doe' }));

    component.onEventForm(MCEventForm.init('custom-event', 'data'));
    expect(emitted.length).toBe(2);
    expect(emitted[1].key).toBe('custom-event');
  });
});
