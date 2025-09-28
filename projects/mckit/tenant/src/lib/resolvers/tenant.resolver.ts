import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MCTenantService } from '../services/tenant.service';
import { MCTenant } from '../entities/mc_tenant';
import { filter, take, takeWhile } from 'rxjs';

export const tenantResolver: ResolveFn<MCTenant> = (route, state) => {
  const tenantService = inject(MCTenantService);
  return tenantService.getCurrent().pipe(
    filter((tenant) => tenant != undefined),
    take(1)
  );
};
