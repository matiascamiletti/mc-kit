import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { MCFieldComponent } from '../mc-field.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MCField } from '../../entities/mc-field';
import { MCIftaField } from '../../entities/mc-ifta-field';
import { MCEventForm } from '../../entities/mc-event-form';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mc-step-buttons-field',
  imports: [CommonModule, ButtonModule],
  templateUrl: './step-buttons-field.component.html',
  styleUrl: './step-buttons-field.component.css'
})
export class StepButtonsFieldComponent extends MCFieldComponent implements OnInit, OnDestroy {

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

  onClickBack() {
    this.eventObs()?.next(MCEventForm.init('step-back', this.field().config.index));
  }

  onClickNext() {
    this.eventObs()?.next(MCEventForm.init('step-next', this.field().config.index));
  }

  onClickFinal() {
    this.isLoading.set(true);
    this.eventObs()?.next(MCEventForm.init('submit', this.group()?.value));
  }
}

export class StepButtonsField {

  static init(index: number, steps: number): MCField {
    let field = MCIftaField.init({
      key: 'step-buttons',
      component: StepButtonsFieldComponent,
      label: '',
      no_control: true,
      extra: {
        index: index,
        steps: steps
      }
    });
    return field;
  }

}
