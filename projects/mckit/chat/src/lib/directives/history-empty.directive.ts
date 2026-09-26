import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[mcHistoryEmpty], [mc-history-empty]'
})
export class MCHistoryEmptyDirective {
  constructor(public template: TemplateRef<any>) {}
}
