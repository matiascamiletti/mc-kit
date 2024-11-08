import { FormGroup } from "@angular/forms";
import { Message } from "primeng/api";
import { catchError, OperatorFunction } from "rxjs";

export abstract class MCBaseModelForm<T extends { id?: any }> {
  isSending: boolean = false;

  messages: Message[] = [];

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
    this.messages = [{ severity: 'error', detail: message }];
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
