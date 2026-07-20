import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { MCFieldComponent } from '../mc-field.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { MCField } from '../../entities/mc-field';
import { MCIftaField } from '../../entities/mc-ifta-field';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
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
    this.loadExtraParams();
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

    if(this.field().config.on_change == undefined){
      return;
    }

    this.control()?.valueChanges.subscribe((value: any) => {

      const newValues = this.field().config.on_change(this.options().find(x => x[this.field().config.optionValue] == value));
      if(newValues == undefined){
        return;
      }

      this.group().patchValue(newValues);
    });
  }

  onChange(event: SelectChangeEvent) {
    if(this.field().config.extra_params == undefined){
      return;
    }

    let dataSelected = this.options().find(x => x[this.field().config.optionValue] == event.value);
    for(let key in this.field().config.extra_params){
      this.group().get(key)?.setValue(dataSelected[this.field().config.extra_params[key]]);
    }
  }

  loadExtraParams() {
    if(this.field().config.extra_params == undefined){
      return;
    }

    for(let key in this.field().config.extra_params){
      this.group().addControl(key, new FormControl());
    }
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
      disabled?: boolean,
      classes?: string,
      on_change?: (selectedItem: any) => any,
      extra_params?: { [key: string]: string }
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
    configObj.config.on_change = config?.on_change;
    configObj.config.extra_params = config?.extra_params;

    return configObj;
  }

}
