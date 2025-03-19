import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { MCComponent } from '../../entities/mc-component';

@Component({
    selector: 'mc-print',
    imports: [],
    template: '<div #contentColumn></div>'
})
export class PrintComponent implements OnInit {
  @Input() component!: MCComponent;

  constructor(
    protected viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    let view = this.viewContainerRef.createComponent(this.component.component);
    (<any>view.instance).component = this.component;
  }
}
