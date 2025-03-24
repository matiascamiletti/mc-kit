import { ValidatorFn } from "@angular/forms";

export class MCField {
  key?: string;
  component: any;

  config?: any

  static initCustom(key: string, component: any, config: any): MCField {
    let field = new MCField();
    field.key = key;
    field.component = component;
    field.config = config;
    return field;
  }

  static init(data: {
    key?: string,
    component: any,
    validators?: ValidatorFn[],
    default_value?: any,
    disabled?: boolean,
    no_control?: boolean
  }): MCField {
    let field = new MCField();
    field.key = data.key;
    field.component = data.component;
    field.config = {
      validators: data.validators,
      default_value: data.default_value,
      disabled: data.disabled,
      no_control: data.no_control
    };
    return field;
  }
}
