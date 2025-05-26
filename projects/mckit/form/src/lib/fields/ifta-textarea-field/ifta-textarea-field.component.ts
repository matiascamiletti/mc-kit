import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IftaLabelModule } from 'primeng/iftalabel';
import { TextareaModule } from 'primeng/textarea';
import { MCFieldComponent } from '../mc-field.component';
import { MCField } from '../../entities/mc-field';
import { MCIftaField } from '../../entities/mc-ifta-field';
import { ReactiveFormsModule, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'mc-ifta-textarea-field',
  imports: [CommonModule, ReactiveFormsModule, IftaLabelModule, TextareaModule],
  templateUrl: './ifta-textarea-field.component.html',
  styleUrl: './ifta-textarea-field.component.css'
})
export class IftaTextareaFieldComponent extends MCFieldComponent {

}

export class IftaTextareaField {

  static init(key: string|undefined, label: string, config?: {
      validators?: ValidatorFn[],
      default_value?: any,
      disabled?: boolean
  }): MCField {
    return MCIftaField.init({
      key: key,
      component: IftaTextareaFieldComponent,
      label: label,
      validators: config?.validators,
      default_value: config?.default_value,
      disabled: config?.disabled
    });
  }

}
