import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { MCFieldComponent } from '../mc-field.component';
import { MCField } from '../../entities/mc-field';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'mc-array-ifta-text-field',
  imports: [CommonModule, ReactiveFormsModule, PanelModule, ButtonModule, IftaLabelModule, InputTextModule],
  templateUrl: './array-ifta-text-field.component.html',
  styleUrl: './array-ifta-text-field.component.css'
})
export class ArrayIftaTextFieldComponent extends MCFieldComponent {

  formArray = computed(() => {
    let formArray: FormArray<FormControl<string>> = (this.group().get(this.field().key!)) as FormArray<FormControl<string>>;
    return formArray;
  });

  onClickAdd() {
    let formArray: FormArray<FormControl<string|null>> = (this.group().get(this.field().key!)) as FormArray<FormControl<string|null>>;
    formArray.push(new FormControl<string>(''));
  }

  onClickRemove(index: number) {
    let formArray: FormArray<FormControl<string|null>> = (this.group().get(this.field().key!)) as FormArray<FormControl<string|null>>;
    formArray.removeAt(index);
  }
}

export class ArrayIftaTextField {

  static init(key: string, data?: {
    labelAddButton?: string,
    labelTitlePanel?: string,
  }): MCField {
    let field = MCField.init({
      key: key,
      component: ArrayIftaTextFieldComponent,
    });
    field.config = {
      is_array_string: true,
      labelAddButton: data?.labelAddButton,
      labelTitlePanel: data?.labelTitlePanel,
    }

    return field;
  }

}
