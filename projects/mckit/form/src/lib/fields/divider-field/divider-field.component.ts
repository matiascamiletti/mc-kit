import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { MCField } from '../../entities/mc-field';
import { MCFieldComponent } from '../mc-field.component';

@Component({
  selector: 'lib-divider-field',
  imports: [CommonModule, DividerModule],
  templateUrl: './divider-field.component.html',
  styleUrl: './divider-field.component.css'
})
export class DividerFieldComponent extends MCFieldComponent {

}

export class DividerField {

  static init(label: string|undefined): MCField {
    let field = MCField.init({
      component: DividerFieldComponent,
      no_control: true,
    });
    field.config.label = label;
    return field;
  }

}
