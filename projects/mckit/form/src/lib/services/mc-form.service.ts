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

  loadFieldsInNewGroup(group: UntypedFormGroup, fields: MCField[], key: string, item: any) {
    let newGroup = new UntypedFormGroup({});
    this.loadFields(newGroup, fields, item);
    group.addControl(key, newGroup);
  }

  loadFieldsWithChildren(group: UntypedFormGroup, field: MCField, item: any) {
    if(field.config?.is_new_group){
      let fieldKey = field.key ?? 'row';
      let subitem = item && item[fieldKey] ? item[fieldKey] : undefined;
      this.loadFieldsInNewGroup(group, field.config.fields, fieldKey, subitem);
    } else {
      this.loadFields(group, field.config.fields, item);
    }
  }

  loadFields(group: UntypedFormGroup, fields: MCField[], item: any) {
    for (const field of fields) {
      if(field.config?.has_children){
        this.loadFieldsWithChildren(group, field, item);
        continue;
      }
      if(field.key == undefined || field.key == '' || field.config?.no_control) {
        continue;
      }

      group.addControl(field.key, this.createControl(field));

      if(item && item[field.key]){
        group.get(field.key)?.setValue(item[field.key]);
      }
    }
  }
}
