import { MCField } from "./mc-field";

export class MCIftaField {

  static init(data: { key?: string|string[], component: any, label:string }): MCField {
    let field = new MCField();
    field.key = data.key;
    field.component = data.component;
    field.config = { label: data.label };
    return field;
  }

}
