import { Component, inject, OnDestroy } from '@angular/core';
import { IftaTextField, MCFieldComponent, MCFormModalService } from '../../../../../mckit/form/src/public-api';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Validators } from '@angular/forms';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-open-modal-field',
  imports: [CommonModule, ButtonModule, DynamicDialogModule],
  providers: [DialogService, MCFormModalService],
  templateUrl: './open-modal-field.component.html',
  styleUrl: './open-modal-field.component.scss'
})
export class OpenModalFieldComponent extends MCFieldComponent implements OnDestroy {

  formModalService = inject(MCFormModalService);

  eventSubscription?: Subscription;

  ngOnDestroy(): void {
    this.eventSubscription?.unsubscribe();
  }

  onClick() {
    let dialogRef = this.formModalService.openRight({
      title: 'Test Modal',
      item: undefined,
      fields: [
        IftaTextField.init('firstname', 'Firstname', { validators: [Validators.required] }),
        IftaTextField.init('lastname', 'Lastname'),
      ]
    });

    this.eventSubscription = dialogRef
    .pipe(switchMap(dialog => dialog.getEventObs()))
    .subscribe(event => {

      if(event.key == 'submit'){
        console.log(event.content);
        event.dialog?.close();
      }

    });
  }
}
