import { Component, input, Input, OnInit } from '@angular/core';
import { PrintListComponent } from '../print-list/print-list.component';
import { McComponentService } from '../../services/mc-component.service';
import { MCComponent } from '../../entities/mc-component';

@Component({
    selector: 'mc-print-service',
    imports: [PrintListComponent],
    templateUrl: './print-service.component.html',
    styleUrl: './print-service.component.css'
})
export class PrintServiceComponent implements OnInit {

  @Input() id: string = '';
  @Input() isFlexRow = false;
  classes = input<string>('');

  components: Array<MCComponent> = [];

  constructor(
    protected componentService: McComponentService
  ) {}

  ngOnInit(): void {
    this.loadComponents();
  }

  loadComponents() {
    this.components = this.componentService.getComponents(this.id);
  }
}
