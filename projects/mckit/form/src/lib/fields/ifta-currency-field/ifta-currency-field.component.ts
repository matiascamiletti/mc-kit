import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MCFieldComponent } from '../mc-field.component';
import { MCField } from '../../entities/mc-field';
import { MCIftaField } from '../../entities/mc-ifta-field';

@Component({
  selector: 'mc-ifta-currency-field',
  imports: [CommonModule, ReactiveFormsModule, IftaLabelModule, InputTextModule, InputNumberModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './ifta-currency-field.component.html',
  styleUrl: './ifta-currency-field.component.css'
})
export class IftaCurrencyFieldComponent extends MCFieldComponent {

}

export class IftaCurrencyField {

  static init(key: string|undefined, label: string, config?: {
      validators?: ValidatorFn[],
      default_value?: any,
      disabled?: boolean,
      prepended?: string,
      appended?: string,
      extra?: any
  }): MCField {
    let extraObj = config?.extra != undefined ? config.extra : {};
    extraObj.prepended = config?.prepended;
    extraObj.appended = config?.appended;

    return MCIftaField.init({
      key: key,
      component: IftaCurrencyFieldComponent,
      label: label,
      validators: config?.validators,
      default_value: config?.default_value,
      disabled: config?.disabled,
      extra: extraObj
    });
  }

}
