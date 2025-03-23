import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MCField } from '../entities/mc-field';

@Injectable({
  providedIn: 'root'
})
export class MCFormService {

  createControl(field: MCField): UntypedFormControl {
    let input = new UntypedFormControl();
    if(field.config.validators){
      input.setValidators(field.config.validators);
    }
    if(field.config.default){
      input.setValue(field.config.default);
    }
    if(field.config.disabled){
      input.disable();
    }

    return input;
  }

  loadFieldsInNewGroup(group: UntypedFormGroup, fields: MCField[], key: string) {
    let newGroup = new UntypedFormGroup({});
    this.loadFields(newGroup, fields);
    group.addControl(key, newGroup);
  }

  loadFields(group: UntypedFormGroup, fields: MCField[]) {
    for (const field of fields) {
      if(field.config?.has_children){
        if(field.config?.is_new_group){
          this.loadFieldsInNewGroup(group, field.config.fields, field.key ?? 'row');
        } else {
          this.loadFields(group, field.config.fields);
        }
        continue;
      }
      if(field.key == undefined || field.key == '' || field.config.no_control) {
        continue;
      }

      group.addControl(field.key, this.createControl(field));
    }
  }
}
