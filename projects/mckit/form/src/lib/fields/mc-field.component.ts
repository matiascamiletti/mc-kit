import { Component, input } from "@angular/core";
import { MCField } from "../entities/mc-field";

@Component({
  selector: 'mc-field',
  template: ''
})
export class MCFieldComponent {
  field = input.required<MCField>();
}
