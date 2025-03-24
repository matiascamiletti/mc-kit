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

  loadFields(group: UntypedFormGroup, fields: MCField[], item: any) {
    for (const field of fields) {
      if(field.config?.has_children){
        if(field.config?.is_new_group){
          this.loadFieldsInNewGroup(group, field.config.fields, field.key ?? 'row', item && item[field.key ?? 'row'] ? item[field.key ?? 'row'] : undefined);
        } else {
          this.loadFields(group, field.config.fields, item);
        }
        continue;
      }
      if(field.key == undefined || field.key == '' || field.config.no_control) {
        continue;
      }

      group.addControl(field.key, this.createControl(field));

      if(item && item[field.key]){
        group.get(field.key)?.setValue(item[field.key]);
      }
    }
  }
}
