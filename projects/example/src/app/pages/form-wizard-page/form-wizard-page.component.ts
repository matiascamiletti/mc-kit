import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MCFormWizard } from '../../../../../mckit/form/src/lib/components/form-wizard/form-wizard.component';
import { MCConfigFormWizard } from '../../../../../mckit/form/src/lib/entities/mc-config-form-wizard';
import { MCEventForm } from '../../../../../mckit/form/src/public-api';
import { IftaTextField } from '@mckit/form';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-form-wizard-page',
  imports: [CommonModule, MCFormWizard],
  templateUrl: './form-wizard-page.component.html',
  styleUrl: './form-wizard-page.component.scss'
})
export class FormWizardPageComponent implements OnInit {

  formConfig = signal<MCConfigFormWizard>(new MCConfigFormWizard());

  ngOnInit(): void {
    this.loadForm();
  }

  onEventForm(event: MCEventForm) {
      console.log(event);
  
      switch (event.key) {
        case 'submit':
          
          break;
      }
    }

  loadForm() {
    let config = this.formConfig();
    config.item = {
      lastname: 'Doe',
      address: {
        country: 'mexico'
      }
    };
    config.steps = [
      {
        title: 'Basic',
        fields: [
          IftaTextField.init('firstname', 'Firstname'),
        ],
      },
      {
        title: 'Advanced',
        fields: [
          IftaTextField.init('lastname', 'Lastname', { validators: [Validators.required] }),
        ],
      },
      {
        title: 'Confirm',
        fields: [
          IftaTextField.init('email', 'Email'),
        ],
      },
    ];

    this.formConfig.set(config);
  }
}
