import { Component } from '@angular/core';
import { MCField, PrintFieldComponent } from '@mckit/form';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConditionalFieldComponent } from '../conditional-field/conditional-field.component';

@Component({
  selector: 'mc-conditional-func-field',
  imports: [CommonModule, ReactiveFormsModule, PrintFieldComponent],
  templateUrl: './conditional-func-field.component.html',
  styleUrl: './conditional-func-field.component.css'
})
export class ConditionalFuncFieldComponent extends ConditionalFieldComponent {
  override verifyCondition(values: any) {
    let field = this.field();

    let isMatch = field.config.conditionalFunc(values);

    if (isMatch) {
      this.isShow.set(true);
    } else {
      this.isShow.set(false);
      this.control()?.setValue(null, { emitEvent: false });
    }
  }
}

export class ConditionalFuncField {

  static init(
    conditionalFunc: (values: any) => boolean,
    fields: MCField[]
  ): MCField {
    let field = MCField.init({
      component: ConditionalFuncFieldComponent,
    });
    field.config = {
      has_children: true,
      fields: fields,
      is_new_group: false,
      conditionalFunc: conditionalFunc
    }

    return field;
  }
}
