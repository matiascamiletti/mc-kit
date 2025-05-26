import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { MCAuthModel } from '../../entities/mc-auth-model';
import { MCBaseAuthPageConfig } from '../../entities/mc-base-auth-page-config';
import { RouterModule } from '@angular/router';
import { MCBaseAuthPage } from '../base-auth-page.component';
import { CommonModule } from '@angular/common';



@Component({
    selector: 'mc-auth-basic',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, CardModule, IconFieldModule, InputIconModule, InputTextModule, PasswordModule, MessageModule, RouterModule],
    templateUrl: './auth-basic.component.html',
    styleUrl: './auth-basic.component.scss'
})
export class MCAuthBasicComponent extends MCBaseAuthPage {
  config = input.required<MCAuthBasicConfig>();
  submit = output<MCAuthModel>();

  onSubmit(obj: MCAuthModel): void {
    this.submit.emit(obj);
  }
}

export class MCAuthBasicConfig extends MCBaseAuthPageConfig {
  subtitle?: string;

  emailPlaceholder?: string;
  passwordPlaceholder?: string;

  submitButton?: string;

  resetPassword?: string;
  resetPasswordLink?: string;

  register?: string;
  registerLink?: string;
}
