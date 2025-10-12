import { inject, Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { MCFooterModalForm } from '../components/footer-modal-form/footer-modal-form.component';
import { MCHttpFormModal } from '../components/http-form-modal/http-form-modal.component';
import { MCConfigHttpModalForm } from '../entities/mc-config-http-modal-form';
import { MCFormModalService } from './form-modal.service';



@Injectable({
  providedIn: 'root'
})
export class MCHttpFormModalService extends MCFormModalService {

  override open(config: MCConfigHttpModalForm): Observable<MCHttpFormModal> {
    let dialog: DynamicDialogRef<MCHttpFormModal> = this.dialogService.open(MCHttpFormModal, {
      header: config.title,
      style: config.style,
      styleClass: config.styleClass,
      closable: true,
      dismissableMask: true,
      duplicate: true,
      position: config.position,
      templates: {
        footer: MCFooterModalForm
      },
      data: config
    })!;

    return dialog.onChildComponentLoaded;
  }

  override openRight(config: MCConfigHttpModalForm): Observable<MCHttpFormModal> {
    return this.open(MCFormModalService.initConfigRight(config));
  }
}
