import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { MCFieldComponent } from '../mc-field.component';
import { MCField } from '../../entities/mc-field';
import { MCIftaField } from '../../entities/mc-ifta-field';
import { ReactiveFormsModule, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'mc-ifta-text-field',
  imports: [CommonModule, ReactiveFormsModule, IftaLabelModule, InputTextModule],
  templateUrl: './ifta-text-field.component.html',
  styleUrl: './ifta-text-field.component.css'
})
export class IftaTextFieldComponent extends MCFieldComponent {

}

export class IftaTextField {

  static init(key: string|undefined, label: string, config?: {
      validators?: ValidatorFn[],
      default_value?: any,
      disabled?: boolean,
      extra?: any
  }): MCField {
    return MCIftaField.init({
      key: key,
      component: IftaTextFieldComponent,
      label: label,
      validators: config?.validators,
      default_value: config?.default_value,
      disabled: config?.disabled,
      extra: config?.extra
    });
  }

}
