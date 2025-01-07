import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { isValidCron } from "../helpers/frequency.helper";

export function frequencyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if(control.value == undefined || control.value == ''){
      return null;
    }

    return isValidCron(control.value) ? null : { invalidFrequency: {value: control.value} };
  };
}
