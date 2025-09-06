import { Component } from '@angular/core';
import { MCFooterModalForm } from '../footer-modal-form/footer-modal-form.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MCEventModalForm } from '../../entities/mc-event-modal-form';

@Component({
  selector: 'mc-footer-with-delete-modal-form',
  imports: [CommonModule, ButtonModule],
  templateUrl: './footer-with-delete-modal-form.component.html',
  styleUrl: './footer-with-delete-modal-form.component.css'
})
export class MCFooterWithDeleteModalForm extends MCFooterModalForm {

  onClickDelete() {
    let event = new MCEventModalForm();
    event.key = 'delete';
    event.dialog = this.dialogRef;
    if(this.group != undefined){
      event.content = this.group()?.value;
    }

    this.eventObs?.next(event);
  }

}
