import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MCForm } from '../form/form.component';
import { MCFormModal } from '../form-modal/form-modal.component';
import { DynamicDialogComponent } from 'primeng/dynamicdialog';
import { MCConfigHttpModalForm } from '../../entities/mc-config-http-modal-form';
import { MCEventForm } from '../../entities/mc-event-form';
import { catchError, Subscription, take } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'mc-http-form-modal',
  imports: [CommonModule, MCForm, ToastModule],
  providers: [MessageService],
  templateUrl: './http-form-modal.component.html',
  styleUrl: './http-form-modal.component.css'
})
export class MCHttpFormModal extends MCFormModal implements OnInit, OnDestroy {

  messageService = inject(MessageService);

  override formConfig = signal<MCConfigHttpModalForm>(new MCConfigHttpModalForm());

  httpSubscription?: Subscription;

  override ngOnInit(): void {
    super.ngOnInit();

    console.log(this.formConfig());
  }

  onSendRequest(item: any) {
    console.log('send request');
    this.httpSubscription?.unsubscribe();

    this.httpSubscription = this.formConfig().http(item)
    .pipe(
      take(1),
      catchError((error: any) => {
        this.messageService.add({ severity: 'error', summary: 'An error has occurred.', detail: error.error.message || error.message || 'Unknown error' });
        throw error;
      })
    )
    .subscribe(resp => {
      this.eventObs.next({ key: 'saved', content: resp, dialog: this.dialogRef });
      this.dialogRef.close();
    });
  }

  ngOnDestroy(): void {
    this.httpSubscription?.unsubscribe();
  }

  override onEventForm(event: MCEventForm) {
    console.log('onEventForm HttpFormModal');
    console.log(event);
    if(event.key == 'submit'){
      console.log('submit event');
      this.onSendRequest(event.content);
    } else {
      this.eventObs.next({ ...event, dialog: this.dialogRef });
    }
  }
}
