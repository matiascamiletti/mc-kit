import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MCBaseAuthPageConfig } from '../../entities/mc-base-auth-page-config';
import { MCBaseAuthPage } from '../base-auth-page.component';
import { MCAuthModel } from '../../entities/mc-auth-model';
import { MessageService } from 'primeng/api';
import { MCMessagesComponent } from '@mckit/core';

@Component({
  selector: 'mc-auth-sakai',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, CardModule, IconFieldModule, InputIconModule, InputTextModule, PasswordModule, CheckboxModule, MCMessagesComponent],
  providers: [MessageService],
  templateUrl: './auth-sakai.component.html',
  styleUrl: './auth-sakai.component.scss'
})
export class MCAuthSakaiComponent extends MCBaseAuthPage {
  config = input.required<MCAuthSakaiConfig>();
  submit = output<MCAuthModel>();
  action = output<string>();

  onSubmit(obj: MCAuthModel): void {
    this.submit.emit(obj);
  }

  onAction(type: string) {
    this.action.emit(type);
  }
}

export class MCAuthSakaiConfig extends MCBaseAuthPageConfig {
  logo?: string;

  subtitle?: string;

  emailPlaceholder?: string;
  passwordPlaceholder?: string;

  submitButton?: string;

  resetPassword?: string;
  resetPasswordLink?: string;

  register?: string;
  registerLink?: string;
}
