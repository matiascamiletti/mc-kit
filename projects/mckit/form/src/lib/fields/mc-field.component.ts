import { Component, input } from "@angular/core";
import { MCField } from "../entities/mc-field";
import { UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { MCEventForm } from "../entities/mc-event-form";

@Component({
  selector: 'mc-field',
  template: ''
})
export class MCFieldComponent {
  field = input.required<MCField>();
  control = input<UntypedFormControl>();
  group = input.required<UntypedFormGroup>();
  eventObs = input<Subject<MCEventForm>>();
}
