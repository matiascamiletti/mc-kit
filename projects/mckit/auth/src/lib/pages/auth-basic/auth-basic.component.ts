import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'mc-auth-basic',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, CardModule, IconFieldModule, InputIconModule, InputTextModule, PasswordModule],
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

  onClickSubmit() {
    let obj = new MCAuthModel();
    obj.email = this.group.get('email')?.value;
    obj.password = this.group.get('password')?.value;

    this.submit.emit(obj);
  }
}

export class MCAuthBasicConfig {
  title?: string;
  subtitle?: string;

  emailPlaceholder?: string;
  passwordPlaceholder?: string;

  submitButton?: string;
}

export class MCAuthModel {
  email?: string|null;
  password?: string|null;
}
