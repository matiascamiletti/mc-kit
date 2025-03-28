import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'mc-actions-column',
  imports: [CommonModule, ButtonModule, TooltipModule],
  templateUrl: './actions-column.component.html',
  styleUrl: './actions-column.component.css'
})
export class MCActionsColumn {

  item = input.required<any>();

  hasEdit = input(true);
  hasRemove = input(true);

  onEdit = output<any>();
  onRemove = output<any>();

  onClickEdit() {
    this.onEdit.emit(this.item());
  }

  onClickRemove() {
    this.onRemove.emit(this.item());
  }
}
