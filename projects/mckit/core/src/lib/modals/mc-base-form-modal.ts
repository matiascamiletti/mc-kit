import { FormGroup } from "@angular/forms";

export abstract class MCBaseFromModal {
  visible: boolean = false;

  formGroup: FormGroup | undefined;

  isSending: boolean = false;

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

  close() {
    this.visible = false;
  }

  cleanForm() {
    this.stopSending();
    this.formGroup?.reset();
  }
}
