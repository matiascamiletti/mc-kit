import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MCAuthModel } from "../entities/mc-auth-model";
import { inject } from "@angular/core";
import { MCMessagesService } from "@mckit/core";

export abstract class MCBaseAuthPage {
  messageService = inject(MCMessagesService);

  group = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', Validators.required)
  });

  isSending = false;

  abstract onSubmit(obj: MCAuthModel): void;

  onClickSubmit() {
    if(this.isSending){
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
    this.messageService.add({ severity: 'success', detail: message});
  }

  showErrorMessage(message: string) {
    this.messageService.add({ severity: 'error', detail: message});
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
