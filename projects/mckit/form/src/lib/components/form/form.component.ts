import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { MCConfigForm } from '../../entities/mc-config-form';
import { PrintFieldComponent } from '../print-field/print-field.component';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MCFormService } from '../../services/mc-form.service';
import { MCEventForm } from '../../entities/mc-event-form';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'mc-form',
  imports: [CommonModule, ReactiveFormsModule, PrintFieldComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class MCForm implements OnInit {
  config = input.required<MCConfigForm>();

  formGroup = signal<UntypedFormGroup|undefined>(undefined);

  formService = inject(MCFormService);

  onEvent = output<MCEventForm>();
  eventObs = new Subject<MCEventForm>();
  eventSubscription?: Subscription;

  ngOnInit(): void {
    this.eventSubscription = this.eventObs.subscribe(event => {
      this.emitEvent(event);
    });
    this.loadFields();
  }

  ngOnDestroy(): void {
    this.eventSubscription?.unsubscribe();
  }

  emitEvent(event: MCEventForm) {
    this.onEvent.emit(event);
  }

  loadFields() {
    let group = new UntypedFormGroup({});
    let fields = this.config().fields ?? [];
    this.formService.loadFields(group, fields, this.config().item);
    this.formGroup.set(group);
  }

  getEventObs(): Subject<MCEventForm> {
    return this.eventObs;
  }
}
