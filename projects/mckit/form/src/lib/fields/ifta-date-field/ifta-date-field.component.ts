import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { MCIftaField } from '../../entities/mc-ifta-field';
import { MCField } from '../../entities/mc-field';
import { MCFieldComponent } from '../mc-field.component';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'mc-ifta-date-field',
  imports: [CommonModule, ReactiveFormsModule, IftaLabelModule, InputTextModule, DatePickerModule],
  templateUrl: './ifta-date-field.component.html',
  styleUrl: './ifta-date-field.component.css'
})
export class IftaDateFieldComponent extends MCFieldComponent {

}

export class IftaDateField {

  static init(key: string | undefined, label: string, config?: {
    date_format: string,
    validators?: ValidatorFn[],
    default_value?: any,
    disabled?: boolean
  }): MCField {
    return MCIftaField.init({
      key: key,
      component: IftaDateFieldComponent,
      label: label,
      validators: config?.validators,
      default_value: config?.default_value,
      disabled: config?.disabled,
      extra: { date_format: config?.date_format ?? 'yy-mm-dd' }
    });
  }

}
