import { Component } from '@angular/core';
import { IftaSelectObsFieldComponent } from '../ifta-select-obs-field/ifta-select-obs-field.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { MultiSelectModule } from 'primeng/multiselect';
import { MCField } from '../../entities/mc-field';
import { MCIftaField } from '../../entities/mc-ifta-field';

@Component({
  selector: 'mc-ifta-multi-select-obs-field',
  imports: [CommonModule, ReactiveFormsModule, IftaLabelModule, MultiSelectModule],
  templateUrl: './ifta-multi-select-obs-field.component.html',
  styleUrl: './ifta-multi-select-obs-field.component.css'
})
export class IftaMultiSelectObsFieldComponent extends IftaSelectObsFieldComponent {

}

export class IftaMultiSelectObsField {

  static init(
    key: string|undefined,
    label: string,
    optionObs: () => Observable<Array<any>>,
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
      component: IftaMultiSelectObsFieldComponent,
      label: label,
      validators: config?.validators,
      default_value: config?.default_value,
      disabled: config?.disabled,
      classes: config?.classes
    });
    configObj.config.optionObs = optionObs;
    configObj.config.optionLabel = optionLabel;
    configObj.config.optionValue = optionValue;

    return configObj;
  }

}