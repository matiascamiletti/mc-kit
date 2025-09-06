import { inject } from '@angular/core';
import { MCHttpFormModalService } from './http-form-modal.service';
import { MCField } from '../entities/mc-field';
import { Observable, switchMap } from 'rxjs';
import { MCEventModalForm } from '../entities/mc-event-modal-form';
import { MCApiRestHttpService } from '@mckit/core';

export class MCBaseHttpFormModalConfig<T extends { id?: any }> {
    title: string = '';
    item?: T;
    httpService!: MCApiRestHttpService<T>;
    identifierField: string = 'id';

    constructor(title: string, httpService: MCApiRestHttpService<T>, item?: T) {
        this.title = title;
        this.item = item;
        this.httpService = httpService;
    }
}

export abstract class MCBaseHttpFormModalService<T extends { id?: any }> {

    formModalService = inject(MCHttpFormModalService);

    abstract getFields(): Array<MCField>;

    open(config: MCBaseHttpFormModalConfig<T>): Observable<MCEventModalForm> {
        return this.formModalService.open({
            title: config.title,
            item: config.item,
            fields: this.getFields(),
            http: (item: any) => {
                if(item[config.identifierField] != undefined && item[config.identifierField] != '') {
                    return config.httpService.update(item);
                }
                return config.httpService.create(item);
            },
        })
        .pipe(
            switchMap(dialog => dialog.getEventObs()),
        );
    }
}
