import { inject, Injectable } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MCConfigForm } from '../entities/mc-config-form';
import { MCFormModal } from '../components/form-modal/form-modal.component';
import { MCFooterModalForm } from '../components/footer-modal-form/footer-modal-form.component';
import { Observable } from 'rxjs';
import { MCConfigModalForm } from '../entities/mc-config-modal-form';



@Injectable({
  providedIn: 'root',
})
export class MCFormModalService {

  dialogService = inject(DialogService);

  open(config: MCConfigModalForm): Observable<MCFormModal> {
    let dialog: DynamicDialogRef<MCFormModal> = this.dialogService.open(MCFormModal, {
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

  openRight(config: MCConfigModalForm): Observable<MCFormModal> {
    return this.open(MCFormModalService.initConfigRight(config));
  }

  static initConfigRight(config: any): any {
    config.position = config.position ?? 'right';
    config.style = config.style ?? { margin: '0px !important', 'max-height': '100%' };
    config.styleClass = config.styleClass ?? 'w-full md:w-2xl mc-form-modal';
    return config;
  }
}
