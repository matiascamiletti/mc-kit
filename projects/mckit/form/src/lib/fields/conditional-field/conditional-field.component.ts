import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { MCFieldComponent } from '../mc-field.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PrintFieldComponent } from '../../components/print-field/print-field.component';
import { MCField } from '../../entities/mc-field';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mc-conditional-field',
  imports: [CommonModule, ReactiveFormsModule, PrintFieldComponent],
  templateUrl: './conditional-field.component.html',
  styleUrl: './conditional-field.component.css'
})
export class ConditionalFieldComponent extends MCFieldComponent implements OnInit, OnDestroy {
  isShow = signal<boolean>(false);

  isCleanControl = false;

  valuesSubscription?: Subscription;

  ngOnInit(): void {
    this.loadObs();
  }

  ngOnDestroy(): void {
    this.valuesSubscription?.unsubscribe();
  }

  verifyCondition(values: any) {
    if(this.isCleanControl){
      this.isCleanControl = false;
      return;
    }

    let field = this.field();

    let value = values[field.config.conditionalKey];
    let isMatch = false;

    // Verify if array
    if (Array.isArray(field.config.conditionalValue)) {
      isMatch = field.config.conditionalValue.includes(value);
    } else {
      isMatch = value === field.config.conditionalValue;
    }

    if (isMatch) {
      this.isShow.set(true);
    } else {
      this.isShow.set(false);
      this.isCleanControl = true;
      this.control()?.setValue(null);
    }
  }

  loadObs() {
    this.valuesSubscription?.unsubscribe();

    this.valuesSubscription = this.group().valueChanges
    .subscribe((value: any) => {
      this.verifyCondition(value);
    });
  }
}

export class ConditionalField {

  static init(
    conditionalKey: string,
    conditionalValue: any,
    fields: MCField[]
  ): MCField {
    let field = MCField.init({
      component: ConditionalFieldComponent,
    });
    field.config = {
      has_children: true,
      fields: fields,
      is_new_group: false,
      conditionalKey: conditionalKey,
      conditionalValue: conditionalValue
    }

    return field;
  }
}
