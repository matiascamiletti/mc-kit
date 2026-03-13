import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { MCField } from '../../entities/mc-field';
import { MCFieldComponent } from '../mc-field.component';
import { MCIftaField } from '@mckit/form';

@Component({
  selector: 'mc-color-field',
  imports: [CommonModule, ReactiveFormsModule, ColorPickerModule],
  templateUrl: './color-field.component.html',
  styleUrl: './color-field.component.css'
})
export class ColorFieldComponent extends MCFieldComponent {

}

export class ColorField {

  static init(key: string | undefined, config?: {
    label?: string,
    validators?: ValidatorFn[],
    default_value?: any,
    disabled?: boolean,
    extra?: any
  }): MCField {
    return MCIftaField.init({
      key: key,
      component: ColorFieldComponent,
      label: config?.label ?? '',
      validators: config?.validators,
      default_value: config?.default_value,
      disabled: config?.disabled,
      extra: config?.extra
    });
  }

}
