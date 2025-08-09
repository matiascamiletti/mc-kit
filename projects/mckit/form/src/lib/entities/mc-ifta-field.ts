import { ValidatorFn } from "@angular/forms";
import { MCField } from "./mc-field";

export class MCIftaField {

  static init(data: {
      key?: string,
      component: any,
      label: string,
      validators?: ValidatorFn[],
      default_value?: any,
      disabled?: boolean,
      no_control?: boolean,
      extra?: any
    }): MCField {
      let field = new MCField();
      field.key = data.key;
      field.component = data.component;
      field.config = {
        ...data.extra,
        label: data.label,
        validators: data.validators,
        default_value: data.default_value,
        disabled: data.disabled,
        no_control: data.no_control
      };
      return field;
    }

}
