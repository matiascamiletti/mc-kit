import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { MCFieldComponent } from '../mc-field.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MCField } from '../../entities/mc-field';
import { MCIftaField } from '../../entities/mc-ifta-field';
import { MCEventForm } from '../../entities/mc-event-form';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mc-submit-button-field',
  imports: [CommonModule, ButtonModule],
  templateUrl: './submit-button-field.component.html',
  styleUrl: './submit-button-field.component.css'
})
export class SubmitButtonFieldComponent extends MCFieldComponent implements OnInit, OnDestroy {

  isLoading = signal<boolean>(false);

  eventSubscription?: Subscription;

  ngOnInit(): void {
    this.eventSubscription = this.eventObs()?.subscribe(event => {
      if(event.key == 'stop-loading') {
        this.isLoading.set(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.eventSubscription?.unsubscribe();
  }

  onClick() {
    this.isLoading.set(true);
    this.eventObs()?.next(MCEventForm.init(this.field().key ?? 'submit', this.group()?.value));
  }
}

export class SubmitButtonField {

  static init(key: string|undefined, label: string, config?: {
    icon?: string,
    disabled?: boolean
  }): MCField {
    let field = MCIftaField.init({
      key: key,
      component: SubmitButtonFieldComponent,
      label: label,
      disabled: config?.disabled,
      no_control: true
    });
    field.config.icon = config?.icon;
    return field;
  }

}
