import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { MCForm } from '../form/form.component';
import { DialogService, DynamicDialogComponent, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MCConfigForm } from '../../entities/mc-config-form';
import { MCEventForm } from '../../entities/mc-event-form';
import { Subject } from 'rxjs';
import { UntypedFormGroup } from '@angular/forms';

export class MCEventModalForm extends MCEventForm {
  dialog?: DynamicDialogRef;
}

@Component({
  selector: 'mc-form-modal',
  imports: [CommonModule, MCForm],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.css'
})
export class MCFormModal implements OnInit {

  formComponent = viewChild(MCForm);

  dialogService = inject(DialogService);
  dialogRef = inject(DynamicDialogRef);

  formConfig = signal<MCConfigForm>(new MCConfigForm());

  eventObs = new Subject<MCEventModalForm>();

  ngOnInit(): void {
    this.initForm();
  }

  onEventForm(event: MCEventForm) {
    this.eventObs.next({ ...event, dialog: this.dialogRef });
  }

  initForm() {
    let instance: DynamicDialogComponent = this.dialogService.getInstance(this.dialogRef);
    if(instance.data == undefined){
      this.dialogRef.close();
      return;
    }

    this.formConfig.set(instance.data);
  }

  getFormGroup(): UntypedFormGroup|undefined {
    return this.formComponent()?.formGroup();
  }

  getEventObs(): Subject<MCEventModalForm> {
    return this.eventObs;
  }
}
