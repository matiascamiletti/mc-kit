import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MCAuthModel } from "../entities/mc-auth-model";
import { inject, signal } from "@angular/core";
import { MCMessage } from "@mckit/core";

export abstract class MCBaseAuthPage {
  group = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', Validators.required)
  });

  isSending = signal(false);

  messages = signal<Array<MCMessage>>([]);

  abstract onSubmit(obj: MCAuthModel): void;

  onClickSubmit() {
    if(this.group.invalid){
      return;
    }

    if(this.isSending()){
      return;
    }

    this.clearMessages();

    let obj = new MCAuthModel();
    obj.email = this.group.get('email')?.value;
    obj.password = this.group.get('password')?.value;

    this.showLoading();
    this.onSubmit(obj);
  }

  showSuccessMessage(message: string) {
    this.messages.set([{ severity: 'success', text: message}]);
  }

  showErrorMessage(message: string) {
    this.messages.set([{ severity: 'error', text: message}]);
  }

  clearMessages() {
    this.messages.set([]);
  }

  showLoading() {
    this.isSending.set(true);
  }

  hideLoading() {
    this.isSending.set(false);
  }
}
