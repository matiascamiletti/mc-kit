import { FormGroup } from "@angular/forms";
import { Message } from "primeng/api";
import { catchError, OperatorFunction } from "rxjs";

export abstract class MCBaseForm {
  formGroup: FormGroup | undefined;

  isSending: boolean = false;

  messages: Message[] = [];

  abstract initForm(): void;

  abstract submit(): void;

  sending(): void {
    this.formGroup?.disable();
    this.isSending = true;
  }

  stopSending(): void {
    this.formGroup?.enable();
    this.isSending = false;
  }

  cleanForm() {
    this.stopSending();
    this.formGroup?.reset();
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
