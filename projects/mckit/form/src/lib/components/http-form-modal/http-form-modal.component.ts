import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MCForm } from '../form/form.component';
import { MCFormModal } from '../form-modal/form-modal.component';
import { MCConfigHttpModalForm } from '../../entities/mc-config-http-modal-form';
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
export class MCHttpFormModal extends MCFormModal implements OnInit, AfterViewInit, OnDestroy {

  messageService = inject(MessageService);

  override formConfig = signal<MCConfigHttpModalForm>(new MCConfigHttpModalForm());

  httpSubscription?: Subscription;

  ngAfterViewInit(): void {
    this.initEvents();
  }

  onSendRequest(item: any) {
    this.httpSubscription?.unsubscribe();

    this.httpSubscription = this.formConfig().http(item)
    .pipe(
      catchError((error: any) => {
        this.emitEvent({ key: 'stop-loading', content: undefined, dialog: this.dialogRef });
        this.messageService.add({ severity: 'error', summary: 'An error has occurred.', detail: error?.error?.message || error?.message?.message || error?.message || 'Unknown error', life: 3000 });
        throw error;
      })
    )
    .subscribe(resp => {
      this.emitEvent({ key: 'saved', content: resp, dialog: this.dialogRef });
      this.dialogRef.close();
    });
  }

  ngOnDestroy(): void {
    this.httpSubscription?.unsubscribe();
  }

  initEvents() {
    this.formComponent()!.getEventObs().subscribe(event => {
      if(event.key == 'submit'){
        this.onSendRequest(event.content);
      }
    });
  }
}
