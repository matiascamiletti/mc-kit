import { inject, Injectable } from '@angular/core';
import { MCApiRestHttpService } from '@mckit/core';
import { MCTenant } from '../entities/mc_tenant';
import { MC_AUTH_CONFIG } from '@mckit/auth';

@Injectable({
  providedIn: 'root'
})
export class MCTenantService extends MCApiRestHttpService<MCTenant> {
  override pathModel = '/tenants';

  config = inject(MC_AUTH_CONFIG);

  constructor() {
    super();
    this.baseUrl = this.config.baseUrl;
  }
}
