import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[mcItemGridTemplate]'
})
export class MCItemGridTemplateDirective {
  constructor(public template: TemplateRef<any>) { }
}
