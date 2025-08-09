import { Component } from '@angular/core';
import { MCFieldComponent } from '../mc-field.component';
import { CommonModule } from '@angular/common';
import { MCField } from '../../entities/mc-field';
import { ReactiveFormsModule } from '@angular/forms';
import { PrintFieldComponent } from '../../components/print-field/print-field.component';
import { FieldsetModule } from 'primeng/fieldset';

@Component({
  selector: 'mc-fieldset-field',
  imports: [CommonModule, ReactiveFormsModule, FieldsetModule, PrintFieldComponent],
  templateUrl: './fieldset-field.component.html',
  styleUrl: './fieldset-field.component.css'
})
export class FieldsetFieldComponent extends MCFieldComponent {

}

export class FieldsetField {

  static init(label: string, fields: MCField[], extra?: any): MCField {
    let field = MCField.init({
      component: FieldsetFieldComponent,
    });

    field.config = {
      ...extra,
      label: label,
      has_children: true,
      fields: fields,
      is_new_group: false
    }

    return field;
  }
}
