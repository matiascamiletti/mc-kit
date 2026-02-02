import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[mcRightHeaderPageTemplate]'
})
export class MCRightHeaderPageTemplateDirective {
  constructor(public template: TemplateRef<any>) { }
}
