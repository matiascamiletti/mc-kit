import { FormGroup } from "@angular/forms";
import { catchError, OperatorFunction } from "rxjs";
import { MCMessage } from "../entities/mc-message";

export abstract class MCBaseModelForm<T extends { id?: any }> {
  isSending: boolean = false;

  messages: MCMessage[] = [];

  copyItem?: T;
  item?: T;

  abstract submit(): void;

  sending(): void {
    this.isSending = true;
  }

  stopSending(): void {
    this.isSending = false;
  }

  cleanForm() {
    this.stopSending();
    if(this.copyItem != undefined){
      this.item = this.copyItem;
    }
  }

  addHttpErrorMessages(data: any) {
    this.addErrorMessage(data.error.message || data.message || 'Unknown error');
  }

  addErrorMessage(message: string) {
    this.messages = [{ severity: 'error', text: message }];
  }

  cleanMessages() {
    this.messages = [];
  }

  catchFormError(): OperatorFunction<any, any> {
    return catchError(error => {
      this.addHttpErrorMessages(error);
      this.stopSending();
      throw error;
    });
  }
}
