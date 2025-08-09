import { CommonModule } from '@angular/common';
import { Component, signal, viewChild } from '@angular/core';
import { IftaTextField, MCConfigForm, MCEventForm, MCForm, RowField, SubmitButtonField } from '../../../../../mckit/form/src/public-api';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-post-edit-page',
  imports: [CommonModule, MCForm],
  templateUrl: './post-edit-page.component.html',
  styleUrl: './post-edit-page.component.scss'
})
export class PostEditPage {
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
        country: 'mexico'
      }
    };
    config.fields = [
      
      RowField.init([

        RowField.init([

          IftaTextField.init('title', 'Title', { validators: [Validators.required] }),

        ], { containerFieldClass: 'w-2/3' }),

        RowField.init([

          IftaTextField.init('lastname', 'Lastname'),

        ], { containerFieldClass: 'w-1/3' }),

      ]),
      SubmitButtonField.init('submit', 'Submit', { icon: 'pi pi-check' })
    ];

    this.formConfig.set(config);
  }
}
