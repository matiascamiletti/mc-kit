import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { MCFieldComponent } from '../mc-field.component';
import { MCField } from '../../entities/mc-field';
import { MCIftaField } from '../../entities/mc-ifta-field';

@Component({
  selector: 'mc-ifta-text-field',
  imports: [CommonModule, IftaLabelModule, InputTextModule],
  templateUrl: './ifta-text-field.component.html',
  styleUrl: './ifta-text-field.component.css'
})
export class IftaTextFieldComponent extends MCFieldComponent {

}

export class IftaTextField {

  static init(key: string|string[]|undefined, label: string): MCField {
    return MCIftaField.init({
      key: key,
      component: IftaTextFieldComponent,
      label: label
    });
  }

}
