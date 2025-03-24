import { inject, Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MCConfigForm } from '../entities/mc-config-form';
import { MCEventModalForm, MCFormModalComponent } from '../components/form-modal/form-modal.component';
import { MCFooterModalForm } from '../components/footer-modal-form/footer-modal-form.component';
import { Observable, switchMap } from 'rxjs';

export class MCConfigModalForm extends MCConfigForm {
  title?: string;
  position?: string;
  styleClass?: string;
  style?: any;
}

@Injectable({
  providedIn: 'root',
})
export class MCFormModalService {

  dialogService = inject(DialogService);

  open(config: MCConfigModalForm): Observable<MCEventModalForm> {
    let dialog: DynamicDialogRef<MCFormModalComponent> = this.dialogService.open(MCFormModalComponent, {
      header: config.title,
      footer: 'Test footer',
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

    return dialog.onChildComponentLoaded
    .pipe(switchMap((comp: MCFormModalComponent) => comp.getEventObs()));
  }

  openRight(config: MCConfigModalForm): Observable<MCEventModalForm> {
    config.position = 'right';
    config.style = { margin: '0px !important', 'max-height': '100%' };
    config.styleClass = 'w-full md:w-2xl mc-form-modal';
    return this.open(config);
  }
}
