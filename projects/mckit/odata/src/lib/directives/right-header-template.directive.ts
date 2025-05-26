import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[mcRightHeaderTemplate]'
})
export class MCRightHeaderTemplateDirective {
  constructor(public template: TemplateRef<any>) {}
}
