import { Component, computed } from '@angular/core';
import { MCFieldComponent } from '../mc-field.component';
import { MCField } from '../../entities/mc-field';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrintFieldComponent } from '../../components/print-field/print-field.component';

@Component({
  selector: 'mc-group-field',
  imports: [CommonModule, ReactiveFormsModule, PrintFieldComponent],
  templateUrl: './group-field.component.html',
  styleUrl: './group-field.component.css'
})
export class GroupFieldComponent extends MCFieldComponent {

  newGroup = computed<UntypedFormGroup|undefined>(() => {
      if(this.field().config?.is_new_group) {
        return this.group().get(this.field().key!) as UntypedFormGroup;
      }

      return undefined;
  });

}

export class GroupField {

  static init(key: string, fields: MCField[]): MCField {
    let field = MCField.init({
      key: key,
      component: GroupFieldComponent,
    });
    field.config = {
      has_children: true,
      fields: fields,
      is_new_group: true
    }

    return field;
  }

}
