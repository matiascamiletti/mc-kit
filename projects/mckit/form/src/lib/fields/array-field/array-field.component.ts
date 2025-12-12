import { Component, computed, inject } from '@angular/core';
import { MCFieldComponent } from '../mc-field.component';
import { MCField } from '../../entities/mc-field';
import { CommonModule } from '@angular/common';
import { FormArray, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MCFormService } from '../../services/mc-form.service';
import { PrintFieldComponent } from '../../components/print-field/print-field.component';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'mc-array-field',
  imports: [CommonModule, ReactiveFormsModule, PrintFieldComponent, PanelModule, ButtonModule],
  templateUrl: './array-field.component.html',
  styleUrl: './array-field.component.css'
})
export class ArrayFieldComponent extends MCFieldComponent {

  formService = inject(MCFormService);

  formArray = computed(() => {
    let formArray: FormArray<UntypedFormGroup> = (this.group().get(this.field().key!)) as FormArray<UntypedFormGroup>;
    return formArray;
  });

  onClickAdd() {
    // Verify if the element is FormArray
    if (!(this.group().get(this.field().key!) instanceof FormArray)) {
      // Create the form Array and set it in the group
      this.group().setControl(this.field().key!, new FormArray([]));
    }

    let formArray: FormArray<UntypedFormGroup> = (this.group().get(this.field().key!)) as FormArray<UntypedFormGroup>;

    let newGroup = new UntypedFormGroup({});
    this.formService.loadFields(newGroup, this.field().config.fields, {});

    formArray.push(newGroup);
  }

  onClickRemove(index: number) {
    let formArray: FormArray<UntypedFormGroup> = (this.group().get(this.field().key!)) as FormArray<UntypedFormGroup>;
    formArray.removeAt(index);
  }
}


export class ArrayField {

  static init(key: string, fields: MCField[], data?: {
    labelAddButton?: string,
    labelTitlePanel?: string,
  }): MCField {
    let field = MCField.init({
      key: key,
      component: ArrayFieldComponent,
    });
    field.config = {
      is_array: true,
      fields: fields,
      labelAddButton: data?.labelAddButton,
      labelTitlePanel: data?.labelTitlePanel,
    }

    return field;
  }

}
