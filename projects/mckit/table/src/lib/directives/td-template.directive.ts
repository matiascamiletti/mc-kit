import { Directive, input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[mcTdTemplate]'
})
export class MCTdTemplateDirective {

  mcTdTemplate = input.required<string>();

  constructor(public template: TemplateRef<any>) {}

  getFieldName() {
    return this.mcTdTemplate();
  }

}
