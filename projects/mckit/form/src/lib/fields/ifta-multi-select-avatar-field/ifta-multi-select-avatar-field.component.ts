import { Component } from '@angular/core';
import { IftaSelectObsFieldComponent } from '../ifta-select-obs-field/ifta-select-obs-field.component';
import { isObservable, Observable, of } from 'rxjs';
import { ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { MCField } from '../../entities/mc-field';
import { MCIftaField } from '../../entities/mc-ifta-field';
import { IftaLabelModule } from 'primeng/iftalabel';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from 'primeng/api';
import { CommonModule } from '@angular/common';

export interface IftaMultiSelectAvatarConfig {
  validators?: ValidatorFn[];
  default_value?: any;
  disabled?: boolean;
  classes?: string;
  optionImage?: string;
  optionSubLabel?: string;
  maxSelectedAvatars?: number;
  filter?: boolean;
  filterBy?: string;
  showClear?: boolean;
  placeholder?: string;
  on_change?: (selectedItem: any) => any;
  extra_params?: { [key: string]: string };
}

@Component({
  selector: 'mc-ifta-multi-select-avatar-field',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IftaLabelModule,
    MultiSelectModule,
    TooltipModule,
    SharedModule
  ],
  templateUrl: './ifta-multi-select-avatar-field.component.html',
  styleUrl: './ifta-multi-select-avatar-field.component.css',
})
export class IftaMultiSelectAvatarFieldComponent extends IftaSelectObsFieldComponent {

  private imgErrors = new Set<string>();

  override loadOptions(): void {
    const optionSource = this.field()?.config?.optionObs;
    if (!optionSource) {
      this.options.set([]);
      return;
    }

    let obs$: Observable<Array<any>>;
    if (typeof optionSource === 'function') {
      obs$ = optionSource();
    } else if (isObservable(optionSource)) {
      obs$ = optionSource as Observable<Array<any>>;
    } else if (Array.isArray(optionSource)) {
      obs$ = of(optionSource);
    } else {
      obs$ = of([]);
    }

    this.isLoading.set(true);
    this.optionsSubscription?.unsubscribe();

    this.optionsSubscription = obs$.subscribe({
      next: (value: Array<any>) => {
        this.options.set(value || []);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  override loadObs(): void {
    this.loadOptions();

    if (this.field()?.config?.on_change == undefined) {
      return;
    }

    this.control()?.valueChanges.subscribe((values: any) => {
      if (!this.field()?.config?.on_change) return;
      const optionValueKey = this.field().config.optionValue;
      const selectedItems = Array.isArray(values)
        ? values.map((val: any) => {
            if (val && typeof val === 'object') return val;
            if (optionValueKey && this.options()) {
              return this.options().find(x => x[optionValueKey] === val) ?? val;
            }
            return val;
          })
        : values;

      const newValues = this.field().config.on_change(selectedItems);
      if (newValues == undefined) {
        return;
      }

      this.group().patchValue(newValues);
    });
  }

  resolveItem(item: any): any {
    if (!item) return null;
    if (typeof item === 'object') {
      return item;
    }
    const optionValueKey = this.field()?.config?.optionValue;
    const allOptions = this.options();
    if (optionValueKey && allOptions && allOptions.length) {
      const match = allOptions.find((opt: any) => opt[optionValueKey] === item);
      if (match) return match;
    }
    return item;
  }

  getUserImage(item: any): string | null {
    if (!item) return null;
    const resolved = this.resolveItem(item);
    if (!resolved || typeof resolved !== 'object') return null;

    const customKey = this.field()?.config?.optionImage;
    if (customKey && resolved[customKey]) {
      return resolved[customKey];
    }
    return resolved.photo || resolved.avatar || resolved.image || resolved.picture || resolved.img || null;
  }

  getUserLabel(item: any): string {
    if (!item) return '';
    const resolved = this.resolveItem(item);
    if (!resolved || typeof resolved !== 'object') return String(resolved);

    const customKey = this.field()?.config?.optionLabel;
    if (customKey && resolved[customKey]) {
      return resolved[customKey];
    }
    return resolved.name || resolved.fullName || resolved.label || resolved.title || resolved.username || String(item);
  }

  getUserSubLabel(item: any): string | null {
    if (!item) return null;
    const resolved = this.resolveItem(item);
    if (!resolved || typeof resolved !== 'object') return null;

    const customKey = this.field()?.config?.optionSubLabel;
    if (customKey && resolved[customKey]) {
      return resolved[customKey];
    }
    return resolved.email || resolved.role || resolved.position || resolved.subtitle || null;
  }

  getUserInitials(item: any): string {
    const label = this.getUserLabel(item);
    if (!label) return '?';
    const parts = label.trim().split(/\s+/);
    if (parts.length >= 2 && parts[0] && parts[1]) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return label.substring(0, 2).toUpperCase();
  }

  getMaxAvatars(): number {
    return this.field()?.config?.maxSelectedAvatars ?? 5;
  }

  getVisibleUsers(selectedOptions: any[] | null | undefined): any[] {
    if (!selectedOptions || !Array.isArray(selectedOptions) || selectedOptions.length === 0) {
      return [];
    }
    const max = this.getMaxAvatars();
    return selectedOptions.slice(0, max);
  }

  getRemainingCount(selectedOptions: any[] | null | undefined): number {
    if (!selectedOptions || !Array.isArray(selectedOptions)) {
      return 0;
    }
    const max = this.getMaxAvatars();
    return Math.max(0, selectedOptions.length - max);
  }

  getRemainingUsersTooltip(selectedOptions: any[] | null | undefined): string {
    if (!selectedOptions || !Array.isArray(selectedOptions)) {
      return '';
    }
    const max = this.getMaxAvatars();
    if (selectedOptions.length <= max) {
      return '';
    }
    const remaining = selectedOptions.slice(max).map(item => this.getUserLabel(item));
    return remaining.join(', ');
  }

  getFilterFields(): string {
    if (this.field()?.config?.filterBy) {
      return this.field().config.filterBy;
    }
    const labelKey = this.field()?.config?.optionLabel || 'name';
    const subLabelKey = this.field()?.config?.optionSubLabel;
    return subLabelKey ? `${labelKey},${subLabelKey}` : labelKey;
  }

  onImgError(imgUrl: string): void {
    if (imgUrl) {
      this.imgErrors.add(imgUrl);
    }
  }

  hasImgError(imgUrl: string | null): boolean {
    return imgUrl ? this.imgErrors.has(imgUrl) : true;
  }
}

export class IftaMultiSelectAvatarField {

  static init(
    key: string | undefined,
    label: string,
    optionObs: (() => Observable<Array<any>>) | Observable<Array<any>> | Array<any>,
    optionLabel: string = 'name',
    optionValue?: string,
    optionImageOrConfig?: string | IftaMultiSelectAvatarConfig,
    config?: IftaMultiSelectAvatarConfig
  ): MCField {
    const isConfig = typeof optionImageOrConfig === 'object' && optionImageOrConfig !== null;
    const resolvedConfig: IftaMultiSelectAvatarConfig = isConfig ? optionImageOrConfig : (config ?? {});
    const optionImage = typeof optionImageOrConfig === 'string'
      ? optionImageOrConfig
      : (resolvedConfig.optionImage ?? 'photo');

    let configObj = MCIftaField.init({
      key: key,
      component: IftaMultiSelectAvatarFieldComponent,
      label: label,
      validators: resolvedConfig.validators,
      default_value: resolvedConfig.default_value,
      disabled: resolvedConfig.disabled,
      classes: resolvedConfig.classes
    });

    configObj.config.optionObs = typeof optionObs === 'function'
      ? optionObs
      : () => (isObservable(optionObs) ? optionObs : of(optionObs));
    configObj.config.optionLabel = optionLabel;
    configObj.config.optionValue = optionValue;
    configObj.config.optionImage = optionImage;
    configObj.config.optionSubLabel = resolvedConfig.optionSubLabel ?? 'email';
    configObj.config.maxSelectedAvatars = resolvedConfig.maxSelectedAvatars ?? 5;
    configObj.config.filter = resolvedConfig.filter ?? true;
    configObj.config.filterBy = resolvedConfig.filterBy;
    configObj.config.showClear = resolvedConfig.showClear ?? false;
    configObj.config.placeholder = resolvedConfig.placeholder;
    configObj.config.on_change = resolvedConfig.on_change;
    configObj.config.extra_params = resolvedConfig.extra_params;

    return configObj;
  }
}