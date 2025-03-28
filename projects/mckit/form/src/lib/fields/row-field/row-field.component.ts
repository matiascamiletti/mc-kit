import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MCField } from '../../entities/mc-field';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { PrintFieldComponent } from '../../components/print-field/print-field.component';
import { GroupFieldComponent } from '../group-field/group-field.component';

@Component({
  selector: 'mc-row-field',
  imports: [CommonModule, ReactiveFormsModule, PrintFieldComponent],
  templateUrl: './row-field.component.html',
  styleUrl: './row-field.component.css'
})
export class RowFieldComponent extends GroupFieldComponent {

}

export class RowField {

  static initWithGroup(key: string, fields: MCField[]): MCField {
    let field = MCField.init({
      key: key,
      component: RowFieldComponent,
    });
    field.config = {
      has_children: true,
      fields: fields,
      is_new_group: true
    }

    return field;
  }

  static init(fields: MCField[]): MCField {
    let field = MCField.init({
      component: RowFieldComponent,
    });
    field.config = {
      has_children: true,
      fields: fields,
      is_new_group: false
    }

    return field;
  }
}
