import { Component, Input } from '@angular/core';
import { MCComponent } from '../../entities/mc-component';
import { PrintComponent } from '../print/print.component';

@Component({
    selector: 'mc-print-list',
    imports: [PrintComponent],
    templateUrl: './print-list.component.html',
    styleUrl: './print-list.component.css'
})
export class PrintListComponent {
  @Input() components: Array<MCComponent> = [];
  @Input() isFlexRow = false;
}
