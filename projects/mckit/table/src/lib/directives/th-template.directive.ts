import { Directive, input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[mcThTemplate]'
})
export class MCThTemplateDirective {

  mcThTemplate = input.required<string>();

  constructor(public template: TemplateRef<any>) {}

  getFieldName() {
    return this.mcThTemplate();
  }
}
