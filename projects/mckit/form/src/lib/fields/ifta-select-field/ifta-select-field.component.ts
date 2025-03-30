import { Component } from '@angular/core';
import { MCFieldComponent } from '../mc-field.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { MCField } from '../../entities/mc-field';
import { MCIftaField } from '../../entities/mc-ifta-field';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'mc-ifta-select-field',
  imports: [CommonModule, ReactiveFormsModule, IftaLabelModule, SelectModule],
  templateUrl: './ifta-select-field.component.html',
  styleUrl: './ifta-select-field.component.css'
})
export class IftaSelectFieldComponent extends MCFieldComponent {

}

export class IftaSelectField {

  static init(
    key: string|undefined,
    label: string,
    options: any[],
    optionLabel?: string,
    optionValue?: string,
    config?: {
      validators?: ValidatorFn[],
      default_value?: any,
      disabled?: boolean
  }): MCField {
    let configObj = MCIftaField.init({
      key: key,
      component: IftaSelectFieldComponent,
      label: label,
      validators: config?.validators,
      default_value: config?.default_value,
      disabled: config?.disabled
    });
    configObj.config.options = options;
    configObj.config.optionLabel = optionLabel;
    configObj.config.optionValue = optionValue;

    return configObj;
  }

}
