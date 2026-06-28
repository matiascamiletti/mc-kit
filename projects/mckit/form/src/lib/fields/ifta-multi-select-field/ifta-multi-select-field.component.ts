import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { MultiSelectModule } from 'primeng/multiselect';
import { MCFieldComponent } from '../mc-field.component';
import { MCIftaField } from '../../entities/mc-ifta-field';
import { MCField } from '../../entities/mc-field';

@Component({
  selector: 'mc-ifta-multi-select-field',
  imports: [CommonModule, ReactiveFormsModule, IftaLabelModule, MultiSelectModule],
  templateUrl: './ifta-multi-select-field.component.html',
  styleUrl: './ifta-multi-select-field.component.css'
})
export class IftaMultiSelectFieldComponent extends MCFieldComponent {

}

export class IftaMultiSelectField {

  static init(
    key: string|undefined,
    label: string,
    options: any[],
    optionLabel?: string,
    optionValue?: string,
    config?: {
      validators?: ValidatorFn[],
      default_value?: any,
      disabled?: boolean,
      classes?: string
  }): MCField {
    let configObj = MCIftaField.init({
      key: key,
      component: IftaMultiSelectFieldComponent,
      label: label,
      validators: config?.validators,
      default_value: config?.default_value,
      disabled: config?.disabled,
      classes: config?.classes
    });
    configObj.config.options = options;
    configObj.config.optionLabel = optionLabel;
    configObj.config.optionValue = optionValue;

    return configObj;
  }

}