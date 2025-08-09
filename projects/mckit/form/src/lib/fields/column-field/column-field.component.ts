import { Component } from '@angular/core';
import { MCFieldComponent } from '../mc-field.component';
import { CommonModule } from '@angular/common';
import { MCField } from '../../entities/mc-field';
import { ReactiveFormsModule } from '@angular/forms';
import { PrintFieldComponent } from '../../components/print-field/print-field.component';

@Component({
  selector: 'mc-column-field',
  imports: [CommonModule, ReactiveFormsModule, PrintFieldComponent],
  templateUrl: './column-field.component.html',
  styleUrl: './column-field.component.css'
})
export class ColumnFieldComponent extends MCFieldComponent {

}

export class ColumnField {

  static init(fields: MCField[], extra?: any): MCField {
    let field = MCField.init({
      component: ColumnFieldComponent,
    });

    field.config = {
      ...extra,
      has_children: true,
      fields: fields,
      is_new_group: false
    }

    return field;
  }
}
