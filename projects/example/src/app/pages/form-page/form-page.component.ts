import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, viewChild } from '@angular/core';
import { ArrayField, DividerField, IftaSelectField, IftaSelectObsField, MCConfigForm, MCEventForm, MCField, MCForm, RowField } from '../../../../../mckit/form/src/public-api';
import { IftaTextField } from '../../../../../mckit/form/src/lib/fields/ifta-text-field/ifta-text-field.component';
import { SubmitButtonField } from '../../../../../mckit/form/src/lib/fields/submit-button-field/submit-button-field.component';
import { Validators } from '@angular/forms';
import { OpenModalFieldComponent } from '../../fields/open-modal-field/open-modal-field.component';
import { IftaTextConditionalField } from '../../../../../mckit/form/src/lib/fields/ifta-text-conditional-field/ifta-text-conditional-field.component';
import { of } from 'rxjs';
import { MonacoField } from '../../../../../mckit/monaco-field/src/public-api';

@Component({
  selector: 'app-form-page',
  imports: [CommonModule, MCForm],
  templateUrl: './form-page.component.html',
  styleUrl: './form-page.component.scss'
})
export class FormPageComponent implements OnInit {

  formComponent = viewChild(MCForm);

  formConfig = signal<MCConfigForm>(new MCConfigForm());

  ngOnInit(): void {
    this.loadForm();
  }

  onSubmit(result: any) {
    setTimeout(() => {
      this.formComponent()?.emitEvent(MCEventForm.init('stop-loading'));
    }, 2000);
  }

  onEventForm(event: MCEventForm) {
    console.log(event);

    switch (event.key) {
      case 'submit':
        this.onSubmit(event.content);
        break;
    }
  }

  loadForm() {
    let config = this.formConfig();
    config.item = {
      lastname: 'Doe',
      address: {
        country: 'USA'
      }
    };
    config.fields = [
      IftaTextField.init('firstname', 'Firstname', { validators: [Validators.required] }),
      IftaTextField.init('lastname', 'Lastname'),
      MCField.initCustom('open-modal', OpenModalFieldComponent, { }),
      RowField.init([
        IftaTextField.init('email', 'Email'),
        IftaTextField.init('phone', 'Phone'),
      ]),
      RowField.initWithGroup('address', [
        IftaTextField.init('address', 'Address'),
        IftaTextField.init('state', 'State'),
        IftaSelectField.init('country', 'Country', [
          { label: 'USA', value: 'usa' },
          { label: 'Canada', value: 'canada-country' },
          { label: 'Mexico', value: 'mexico' }
        ], 'label', 'value'),
        IftaTextConditionalField.init('department', 'Department', 'country', 'canada-country'),
      ]),
      DividerField.init('Client info'),
      IftaSelectObsField.init('client', 'Client', () => of([
        { id: 'client-1', title: 'Client 1' },
        { id: 'client-2', title: 'Client 2' },
        { id: 'client-3', title: 'Client 3' },
        { id: 'client-4', title: 'Client 4' },
        { id: 'client-5', title: 'Client 5' }
      ]), 'title', 'id'),
      DividerField.init('Products'),
      ArrayField.init(
        'items',
        [
          IftaTextField.init('item', 'Item'),
          IftaTextField.init('quantity', 'Quantity'),
          IftaTextField.init('price', 'Price'),
        ],
        { labelAddButton: 'Add Item', labelTitlePanel: 'Producto' }
      ),
      DividerField.init('Monaco Editor'),
      MonacoField.initOneLine({ key: 'one_line', language: 'nodejs', label: 'Variable' }),
      MonacoField.init({ key: 'json_data', language: 'json' }),
      SubmitButtonField.init('submit', 'Submit', { icon: 'pi pi-check' })
    ];

    this.formConfig.set(config);
  }
}
