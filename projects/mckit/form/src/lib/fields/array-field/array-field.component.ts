import { Component, computed, inject } from '@angular/core';
import { MCFieldComponent } from '../mc-field.component';
import { MCField } from '../../entities/mc-field';
import { CommonModule } from '@angular/common';
import { FormArray, ReactiveFormsModule, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { MCFormService } from '../../services/mc-form.service';
import { PrintFieldComponent } from '../../components/print-field/print-field.component';

@Component({
  selector: 'mc-array-field',
  imports: [CommonModule, ReactiveFormsModule, PrintFieldComponent],
  templateUrl: './array-field.component.html',
  styleUrl: './array-field.component.css'
})
export class ArrayFieldComponent  extends MCFieldComponent {

  formService = inject(MCFormService);

  formArray = computed(() => {
    let formArray: FormArray<UntypedFormGroup> = (this.group().get(this.field().key!)) as FormArray<UntypedFormGroup>;
    return formArray;
  });

  onClickAdd() {
   let formArray: FormArray<UntypedFormGroup> = (this.group().get(this.field().key!)) as FormArray<UntypedFormGroup>;

   let newGroup = new UntypedFormGroup({});
   this.formService.loadFields(newGroup, this.field().config.fields, {});

   formArray.push(newGroup);
  }
}


export class ArrayField {

  static init(key: string, fields: MCField[]): MCField {
    let field = MCField.init({
      key: key,
      component: ArrayFieldComponent,
    });
    field.config = {
      is_array: true,
      fields: fields
    }

    return field;
  }

}
