import { Injectable } from '@angular/core';
import { FormArray, FormControl, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
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

  createArrayControl(field: MCField): UntypedFormArray {
    let array = new UntypedFormArray([]);
    return array;
  }

  createArrayStringControl(field: MCField): FormArray<FormControl<string|null>> {
    let array = new FormArray<FormControl<string|null>>([]);
    return array;
  }

  loadFieldsInArray(group: UntypedFormGroup, field: MCField, item: any) {
    let fieldKey = field.key ?? 'rows';
    let subitem = item && item[fieldKey] ? item[fieldKey] : undefined;
    let array = this.createArrayControl(field);
    group.addControl(fieldKey, array);

    if(subitem && Array.isArray(subitem)){
      for(let i = 0; i < subitem.length; i++){
        let newGroup = new UntypedFormGroup({});
        this.loadFields(newGroup, field.config.fields, subitem[i]);
        array.push(newGroup);
      }
    }
  }

  loadFieldsInArrayString(group: UntypedFormGroup, field: MCField, item: any) {
    let fieldKey = field.key ?? 'rows';
    let subitem = item && item[fieldKey] ? item[fieldKey] : undefined;
    let array = this.createArrayStringControl(field);
    group.addControl(fieldKey, array);

    if(subitem && Array.isArray(subitem)){
      for(let i = 0; i < subitem.length; i++){
        let newControl = new FormControl<string|null>(subitem[i]);
        array.push(newControl);
      }
    }
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
      if(field.config.is_array){
        this.loadFieldsInArray(group, field, item);
        continue;
      }
      if(field.config.is_array_string){
        this.loadFieldsInArrayString(group, field, item);
        continue;
      }
      if(field.config?.has_children){
        this.loadFieldsWithChildren(group, field, item);
        continue;
      }
      if(field.key == undefined || field.key == '' || field.config?.no_control) {
        continue;
      }

      group.addControl(field.key, this.createControl(field));

      if(item && item[field.key] != undefined){
        group.get(field.key)?.setValue(item[field.key]);
      }
    }
  }
}
