import { MCApiRestHttpService } from './api-rest-http.service';

export abstract class MCApiRestParentHttpService<T extends { id?: any }> extends MCApiRestHttpService<T> {

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
