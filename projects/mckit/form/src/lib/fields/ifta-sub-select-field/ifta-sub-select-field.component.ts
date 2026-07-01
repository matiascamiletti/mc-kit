import { Component, OnDestroy, OnInit } from '@angular/core';
import { IftaSelectObsFieldComponent } from '../ifta-select-obs-field/ifta-select-obs-field.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { SelectModule } from 'primeng/select';
import { Observable, Subscription } from 'rxjs';
import { MCField } from '../../entities/mc-field';
import { MCIftaField } from '../../entities/mc-ifta-field';

@Component({
  selector: 'mc-ifta-sub-select-field',
  imports: [CommonModule, ReactiveFormsModule, IftaLabelModule, SelectModule],
  templateUrl: './ifta-sub-select-field.component.html',
  styleUrl: './ifta-sub-select-field.component.css'
})
export class IftaSubSelectFieldComponent extends IftaSelectObsFieldComponent implements OnDestroy {

  valueSubscription?: Subscription;

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.valueSubscription?.unsubscribe();
  }

  override loadObs() {
    this.valueSubscription = this.group().get(this.field().config.parentKey)?.valueChanges.subscribe((value: any) => {
      this.searchOptions(value);
    });
  }

  searchOptions(value: any) {
    this.isLoading.set(true);
    this.optionsSubscription?.unsubscribe();

    this.optionsSubscription = this.field().config.optionObs(value)
    .subscribe((value: Array<any>) => {
      this.options.set(value);
      this.isLoading.set(false);
    });
  }
}

export class IftaSubSelectObsField {

  static init(
    key: string|undefined,
    label: string,
    parentKey: string,
    optionObs: (value: any) => Observable<Array<any>>,
    optionLabel?: string,
    optionValue?: string,
    config?: {
      validators?: ValidatorFn[],
      default_value?: any,
      disabled?: boolean,
      classes?: string
  }): MCField {
    let configObj = MCIftaField.init({
      key: key,
      component: IftaSubSelectFieldComponent,
      label: label,
      validators: config?.validators,
      default_value: config?.default_value,
      disabled: config?.disabled
    });
    configObj.config.parentKey = parentKey;
    configObj.config.optionObs = optionObs;
    configObj.config.optionLabel = optionLabel;
    configObj.config.optionValue = optionValue;

    return configObj;
  }

}
