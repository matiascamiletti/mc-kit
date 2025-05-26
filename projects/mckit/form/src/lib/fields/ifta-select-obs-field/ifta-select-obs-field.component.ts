import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { MCFieldComponent } from '../mc-field.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { MCField } from '../../entities/mc-field';
import { MCIftaField } from '../../entities/mc-ifta-field';
import { SelectModule } from 'primeng/select';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'mc-ifta-select-obs-field',
  imports: [CommonModule, ReactiveFormsModule, IftaLabelModule, SelectModule],
  templateUrl: './ifta-select-obs-field.component.html',
  styleUrl: './ifta-select-obs-field.component.css'
})
export class IftaSelectObsFieldComponent extends MCFieldComponent implements OnInit, OnDestroy {

  isLoading = signal<boolean>(false);

  options = signal<Array<any>>([]);
  
  optionsSubscription?: Subscription;

  ngOnInit(): void {
    this.loadObs();
  }

  ngOnDestroy(): void {
    this.optionsSubscription?.unsubscribe();
  }

  loadObs() {
    this.isLoading.set(true);
    this.optionsSubscription?.unsubscribe();

    this.optionsSubscription = this.field().config.optionObs()
    .subscribe((value: Array<any>) => {
      this.options.set(value);
      this.isLoading.set(false);
    });
  }
}

export class IftaSelectObsField {

  static init(
    key: string|undefined,
    label: string,
    optionObs: () => Observable<Array<any>>,
    optionLabel?: string,
    optionValue?: string,
    config?: {
      validators?: ValidatorFn[],
      default_value?: any,
      disabled?: boolean
  }): MCField {
    let configObj = MCIftaField.init({
      key: key,
      component: IftaSelectObsFieldComponent,
      label: label,
      validators: config?.validators,
      default_value: config?.default_value,
      disabled: config?.disabled
    });
    configObj.config.optionObs = optionObs;
    configObj.config.optionLabel = optionLabel;
    configObj.config.optionValue = optionValue;

    return configObj;
  }

}
