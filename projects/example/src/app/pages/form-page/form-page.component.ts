import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, viewChild } from '@angular/core';
import { MCConfigForm, MCEventForm, MCField, MCFormComponent, RowField } from '../../../../../mckit/form/src/public-api';
import { IftaTextField } from '../../../../../mckit/form/src/lib/fields/ifta-text-field/ifta-text-field.component';
import { SubmitButtonField } from '../../../../../mckit/form/src/lib/fields/submit-button-field/submit-button-field.component';
import { Validators } from '@angular/forms';
import { OpenModalFieldComponent } from '../../fields/open-modal-field/open-modal-field.component';

@Component({
  selector: 'app-form-page',
  imports: [CommonModule, MCFormComponent],
  templateUrl: './form-page.component.html',
  styleUrl: './form-page.component.scss'
})
export class FormPageComponent implements OnInit {

  formComponent = viewChild(MCFormComponent);

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
        IftaTextField.init('country', 'Country'),
      ]),
      SubmitButtonField.init('submit', 'Submit', { icon: 'pi pi-check' })
    ];

    this.formConfig.set(config);
  }
}
