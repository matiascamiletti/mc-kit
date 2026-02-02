import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { Component, inject, OnInit } from "@angular/core";
import { MCApiRestHttpService } from "../services/api-rest-http.service";
import { Observable, tap } from "rxjs";
import { MCBaseForm } from "../components/mc-base-form";

@Component({
  selector: 'mc-base-http-form-modal',
  standalone: true,
  template: '',
})
export abstract class MCBaseHttpFormModal<T extends { id?: any }> extends MCBaseForm implements OnInit {
  dialogService = inject(DialogService);
  dialogRef = inject(DynamicDialogRef);

  httpService?: MCApiRestHttpService<T>;

  ngOnInit(): void {
    this.initForm();
    this.initData();
  }

  setItem(item: T): void {
    this.formGroup?.patchValue(item);
  }

  submit(): void {
    if(this.formGroup!.invalid){
      return;
    }

    this.cleanMessages();
    this.sending();

    const item = this.formGroup!.value as T;
    if(item.id){
      this.onSubmit(this.httpService!.update(item));
    } else {
      this.onSubmit(this.httpService!.create(item));
    }
  }

  onSubmit(obs: Observable<T>) {
    obs.pipe(
      this.catchFormError(),
      tap((result) => {
        this.cleanForm();
        this.dialogRef.close(result);
      }),
    )
    .subscribe();
  }

  onClose() {
    this.cleanForm();
    this.dialogRef.close();
  }

  initData() {
    let instance = this.dialogService.getInstance(this.dialogRef);
    if(instance?.data != undefined){
      this.setItem(instance.data);
    }
  }
}
