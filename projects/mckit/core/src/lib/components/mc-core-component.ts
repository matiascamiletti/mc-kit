import { Component, Input } from "@angular/core";
import { MCComponent } from "../entities/mc-component";

@Component({
  standalone: true,
  template: '',
})
export class MCCoreComponent {
  @Input() component!: MCComponent;
}
