import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { MCBaseFormModal } from "./mc-base-form-modal";
import { Component, inject, OnInit } from "@angular/core";
import { MCApiRestHttpService } from "../services/api-rest-http.service";

@Component({
  selector: 'mc-base-http-form-modal',
  standalone: true,
  template: '',
})
export abstract class MCBaseHttpFormModal<T extends { id?: any }> extends MCBaseFormModal implements OnInit {
  dialogService = inject(DialogService);
  dialogRef = inject(DynamicDialogRef);

  httpService?: MCApiRestHttpService<T>;

  item?: T;

  ngOnInit(): void {
    this.initData();
  }

  setItem(item: T): void {
    this.item = item;
  }

  submit(): void {
    this.dialogRef.close(this.item);
  }

  onClose() {
    this.dialogRef.close();
  }

  initData() {
    let instance = this.dialogService.getInstance(this.dialogRef);
    if(instance.data != undefined){
      this.setItem(instance.data);
    }
  }
}
