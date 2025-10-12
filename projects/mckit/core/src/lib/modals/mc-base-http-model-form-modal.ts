import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { Component, inject, OnInit } from "@angular/core";
import { MCApiRestHttpService } from "../services/api-rest-http.service";
import { Observable, tap } from "rxjs";
import { MCBaseModelForm } from "../components/mc-base-model-form";

@Component({
  selector: 'mc-base-http-model-form-modal',
  standalone: true,
  template: '',
})
export abstract class MCBaseHttpModelFormModal<T extends { id?: any }> extends MCBaseModelForm<T> implements OnInit {
  dialogService = inject(DialogService);
  dialogRef = inject(DynamicDialogRef);

  httpService?: MCApiRestHttpService<T>;

  ngOnInit(): void {
    this.initData();
  }

  setItem(item: T): void {
    this.item = item;
  }

  submit(): void {
    if(this.item == undefined){
      return;
    }

    this.cleanMessages();
    this.sending();

    if(this.item.id){
      this.onSubmit(this.httpService!.update(this.item));
    } else {
      this.onSubmit(this.httpService!.create(this.item));
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
    this.dialogRef.close();
  }

  initData() {
    let instance = this.dialogService.getInstance(this.dialogRef);
    if(instance?.data != undefined){
      this.setItem(instance.data);
    }
  }
}
