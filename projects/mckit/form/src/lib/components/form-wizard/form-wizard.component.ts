import { CommonModule } from '@angular/common';
import { afterNextRender, Component, computed, effect, input, OnChanges, OnInit, output, SimpleChanges, viewChild, viewChildren } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Stepper, StepperModule } from 'primeng/stepper';
import { MCConfigFormWizard } from '../../entities/mc-config-form-wizard';
import { MCEventForm } from '../../entities/mc-event-form';
import { MCField } from '../../entities/mc-field';
import { MCForm } from '../form/form.component';
import { MCConfigForm } from '../../entities/mc-config-form';

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

    this.config().steps.forEach(step => {
      let fc = new MCConfigForm();
      fc.fields = step.fields;
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
}
