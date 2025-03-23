import { Injectable } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
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
}
