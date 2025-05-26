import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[mcLeftHeaderTemplate]'
})
export class MCLeftHeaderTemplateDirective {
  constructor(public template: TemplateRef<any>) {}
}
