import { inject, Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { MCFooterModalForm } from '../components/footer-modal-form/footer-modal-form.component';
import { MCHttpFormModal } from '../components/http-form-modal/http-form-modal.component';
import { MCConfigHttpModalForm } from '../entities/mc-config-http-modal-form';



@Injectable({
  providedIn: 'root'
})
export class MCHttpFormModalService {

  dialogService = inject(DialogService);

  open(config: MCConfigHttpModalForm): Observable<MCHttpFormModal> {
    let dialog: DynamicDialogRef<MCHttpFormModal> = this.dialogService.open(MCHttpFormModal, {
      header: config.title,
      style: config.style,
      styleClass: config.styleClass,
      closable: true,
      dismissableMask: true,
      position: config.position,
      templates: {
        footer: MCFooterModalForm
      },
      data: config
    });

    return dialog.onChildComponentLoaded;
  }

  openRight(config: MCConfigHttpModalForm): Observable<MCHttpFormModal> {
    config.position = 'right';
    config.style = { margin: '0px !important', 'max-height': '100%' };
    config.styleClass = 'w-full md:w-2xl mc-form-modal';
    return this.open(config);
  }
}
