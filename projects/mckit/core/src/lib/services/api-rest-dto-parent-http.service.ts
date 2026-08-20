import { MCApiRestDtoHttpService } from './api-rest-dto-http.service';

export abstract class MCApiRestDtoParentHttpService<DTO extends { id?: any }, ENTITY extends { id?: any }> extends MCApiRestDtoHttpService<DTO, ENTITY> {

    /**
     * Assign parent model to use in the service (e.g. 'projects')
     */
    abstract parentModel: string;

    /**
     * Assign parent id to use in the service
     */
    parentId: string = '';

    setParentId(parentId: string): void {
        this.parentId = parentId;
    }

    override get endpoint(): string {
        return `${this.baseUrl}${this.parentModel}/${this.parentId}/${this.pathModel}`;
    }
}
