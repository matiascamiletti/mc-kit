import { Component, EventEmitter, Input, Output } from '@angular/core';
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



@Component({
  selector: 'mc-auth-basic',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, CardModule, IconFieldModule, InputIconModule, InputTextModule, PasswordModule, MessagesModule, RouterModule],
  providers: [MessageService],
  templateUrl: './auth-basic.component.html',
  styleUrl: './auth-basic.component.scss'
})
export class MCAuthBasicComponent {
  @Input() config!: MCAuthBasicConfig;
  @Output() submit = new EventEmitter<MCAuthModel>();

  group = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', Validators.required)
  });

  isSending = false;

  constructor(
    private messageService: MessageService
  ) {}

  onClickSubmit() {
    this.clearMessages();

    let obj = new MCAuthModel();
    obj.email = this.group.get('email')?.value;
    obj.password = this.group.get('password')?.value;

    this.showLoading();
    this.submit.emit(obj);
  }

  showSuccessMessage(message: string) {
    this.messageService.add({ severity: 'success', summary: message});
  }

  showErrorMessage(message: string) {
    this.messageService.add({ severity: 'error', summary: message});
  }

  clearMessages() {
    this.messageService.clear();
  }

  showLoading() {
    this.isSending = true;
  }

  hideLoading() {
    this.isSending = false;
  }
}

export class MCAuthBasicConfig extends MCBaseAuthPageConfig {
  subtitle?: string;

  emailPlaceholder?: string;
  passwordPlaceholder?: string;

  submitButton?: string;

  resetPassword?: string;
  resetPasswordLink?: string;
}
