import { Component } from '@angular/core';
import { MCFieldComponent } from '../mc-field.component';
import { MCField } from '../../entities/mc-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-hidden-field',
  imports: [CommonModule],
  templateUrl: './hidden-field.component.html',
  styleUrl: './hidden-field.component.css'
})
export class HiddenFieldComponent extends MCFieldComponent {

}

export class HiddenField {

  static init(key: string|undefined, default_value?: any): MCField {
    return MCField.init({
      key: key,
      component: HiddenFieldComponent,
      default_value: default_value
    });
  }

}
