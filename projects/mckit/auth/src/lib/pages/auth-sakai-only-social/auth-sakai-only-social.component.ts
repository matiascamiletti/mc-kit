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
import { MCBaseAuthPage } from '../base-auth-page.component';
import { MCAuthModel } from '../../entities/mc-auth-model';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MCAuthSakaiConfig } from '../auth-sakai/auth-sakai.component';

@Component({
  selector: 'mc-auth-sakai-social',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, CardModule, IconFieldModule, InputIconModule, InputTextModule, PasswordModule, CheckboxModule, MessagesModule],
  providers: [MessageService],
  templateUrl: './auth-sakai-only-social.component.html',
  styleUrl: './auth-sakai-only-social.component.scss'
})
export class MCAuthSakaiSocialComponent extends MCBaseAuthPage {
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
