import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, OnInit, output, viewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Stepper, StepperModule } from 'primeng/stepper';
import { MCConfigFormWizard, MCFormWizardStep } from '../../entities/mc-config-form-wizard';
import { MCEventForm } from '../../entities/mc-event-form';
import { MCForm } from '../form/form.component';
import { MCConfigForm } from '../../entities/mc-config-form';
import { StepButtonsField } from '../../fields/step-buttons-field/step-buttons-field.component';

@Component({
  selector: 'mc-form-wizard',
  imports: [CommonModule, StepperModule, ButtonModule, MCForm],
  templateUrl: './form-wizard.component.html',
  styleUrl: './form-wizard.component.css'
})
export class MCFormWizard implements OnInit {
  config = input.required<MCConfigFormWizard>();

  wizardStepper = viewChild<Stepper>('wizardStepper');
  form = viewChild<MCForm>(MCForm);

  onEvent = output<MCEventForm>();

  steps = computed<MCConfigForm[]>(() => {
    let st = new Array<MCConfigForm>();

    this.config().steps.forEach((step: MCFormWizardStep, index: number) => {
      let fc = new MCConfigForm();
      fc.fields = step.fields;
      fc.fields.push(StepButtonsField.init(index, this.config().steps.length));
      fc.item = this.itemPrivate;
      st.push(fc);
    });

    return st;
  });

  itemPrivate: any;

  constructor() {
    effect(() => {
      this.form()?.patchValues(this.itemPrivate);
    });
  }

  ngOnInit(): void {
    this.itemPrivate = this.config().item;
  }

  onClickNext(currentIndex: number): void {
    this.itemPrivate = { ...this.itemPrivate, ...this.form()?.getValues() };
    this.wizardStepper()?.updateValue(currentIndex + 2);
  }

  onClickBack(currentIndex: number): void {
    this.itemPrivate = { ...this.itemPrivate, ...this.form()?.getValues() };
    this.wizardStepper()?.updateValue(currentIndex);
  }

  onEventForm(event: MCEventForm) {
    switch (event.key) {
      case 'step-back':
        this.onClickBack(event.content);
        break;
      case 'step-next':
        this.onClickNext(event.content);
        break;
      case 'submit':
          this.itemPrivate = { ...this.itemPrivate, ...this.form()?.getValues() };
          this.onEvent.emit(MCEventForm.init('submit', this.itemPrivate));
          break;
      default:
        this.onEvent.emit(event);
        break;
    }
  }
}
