import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MCConfigForm } from '../../../../../mckit/form/src/public-api';

@Component({
  selector: 'app-form-page',
  imports: [CommonModule],
  templateUrl: './form-page.component.html',
  styleUrl: './form-page.component.scss'
})
export class FormPageComponent implements OnInit {

  formConfig = new MCConfigForm();

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.formConfig.fields = [

    ];
  }
}
