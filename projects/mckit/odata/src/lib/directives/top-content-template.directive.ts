import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[mcTopContentTemplate]'
})
export class MCTopContentTemplateDirective {
    constructor(public template: TemplateRef<any>) { }
}
