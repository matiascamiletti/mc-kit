import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MCConfigForm, MCFormComponent } from '../../../../../mckit/form/src/public-api';

@Component({
  selector: 'app-form-page',
  imports: [CommonModule, MCFormComponent],
  templateUrl: './form-page.component.html',
  styleUrl: './form-page.component.scss'
})
export class FormPageComponent implements OnInit {

  formConfig = signal<MCConfigForm>(new MCConfigForm());

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    let config = this.formConfig();
    config.fields = [

    ];

    this.formConfig.set(config);
  }
}
