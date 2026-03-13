import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { MCIftaField } from '../../entities/mc-ifta-field';
import { MCField } from '../../entities/mc-field';
import { MCFieldComponent } from '../mc-field.component';

@Component({
  selector: 'lib-checkbox-field',
  imports: [CommonModule, ReactiveFormsModule, CheckboxModule],
  templateUrl: './checkbox-field.component.html',
  styleUrl: './checkbox-field.component.css'
})
export class CheckboxFieldComponent extends MCFieldComponent {

}

export class CheckboxField {

  static init(key: string | undefined, config?: {
    label?: string,
    validators?: ValidatorFn[],
    default_value?: any,
    disabled?: boolean,
    extra?: any
  }): MCField {
    return MCIftaField.init({
      key: key,
      component: CheckboxFieldComponent,
      label: config?.label ?? '',
      validators: config?.validators,
      default_value: config?.default_value,
      disabled: config?.disabled,
      extra: config?.extra
    });
  }

}
