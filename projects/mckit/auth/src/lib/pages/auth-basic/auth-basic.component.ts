import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { MCAuthModel } from '../../entities/mc-auth-model';
import { MCBaseAuthPageConfig } from '../../entities/mc-base-auth-page-config';
import { RouterModule } from '@angular/router';
import { MCBaseAuthPage } from '../base-auth-page.component';



@Component({
  selector: 'mc-auth-basic',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, CardModule, IconFieldModule, InputIconModule, InputTextModule, PasswordModule, MessagesModule, RouterModule],
  providers: [MessageService],
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
