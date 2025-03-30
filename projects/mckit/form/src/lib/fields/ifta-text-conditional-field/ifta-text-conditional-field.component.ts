import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { MCFieldComponent } from '../mc-field.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { identity, Subscription } from 'rxjs';
import { MCIftaField } from '../../entities/mc-ifta-field';
import { MCField } from '../../entities/mc-field';

@Component({
  selector: 'mc-ifta-text-conditional-field',
  imports: [CommonModule, ReactiveFormsModule, IftaLabelModule, InputTextModule],
  templateUrl: './ifta-text-conditional-field.component.html',
  styleUrl: './ifta-text-conditional-field.component.css'
})
export class IftaTextConditionalFieldComponent extends MCFieldComponent implements OnInit, OnDestroy {

  isShow = signal<boolean>(false);

  isCleanControl = false;

  valuesSubscription?: Subscription;

  ngOnInit(): void {
    this.loadObs();
  }

  ngOnDestroy(): void {
    this.valuesSubscription?.unsubscribe();
  }

  verifyCondition(values: any) {
    if(this.isCleanControl){
      this.isCleanControl = false;
      return;
    }

    let field = this.field();

    let value = values[field.config.conditionalKey];
    if (value === field.config.conditionalValue) {
      this.isShow.set(true);
    } else {
      this.isShow.set(false);
      this.isCleanControl = true;
      this.control()?.setValue(null);
    }
  }

  loadObs() {
    this.valuesSubscription?.unsubscribe();

    this.valuesSubscription = this.group().valueChanges
    .subscribe((value: any) => {
      this.verifyCondition(value);
    });
  }
}

export class IftaTextConditionalField {

  static init(
    key: string|undefined,
    label: string,
    conditionalKey: string,
    conditionalValue: any,
    config?: {
      validators?: ValidatorFn[],
      default_value?: any,
      disabled?: boolean
  }): MCField {
    let configObj = MCIftaField.init({
      key: key,
      component: IftaTextConditionalFieldComponent,
      label: label,
      validators: config?.validators,
      default_value: config?.default_value,
      disabled: config?.disabled
    });
    configObj.config.conditionalKey = conditionalKey;
    configObj.config.conditionalValue = conditionalValue;

    return configObj;
  }

}

