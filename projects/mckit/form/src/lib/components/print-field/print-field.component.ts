import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, ViewContainerRef } from '@angular/core';
import { MCField } from '../../entities/mc-field';
import { AbstractControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { MCEventForm } from '../../entities/mc-event-form';

@Component({
  selector: 'mc-print-field',
  imports: [CommonModule, ReactiveFormsModule],
  template: '',
  styleUrl: './print-field.component.css'
})
export class PrintFieldComponent implements OnInit {

  field = input.required<MCField>();
  control = input<AbstractControl|null>();
  group = input<UntypedFormGroup>();
  eventObs = input<Subject<MCEventForm>>();

  viewContainerRef = inject(ViewContainerRef);

  ngOnInit(): void {
    const view = this.viewContainerRef.createComponent(this.field().component);
    view.setInput('field', this.field());
    view.setInput('control', this.control());
    view.setInput('group', this.group());
    view.setInput('eventObs', this.eventObs());
  }
}
