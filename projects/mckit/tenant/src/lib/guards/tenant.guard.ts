import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { MCTenantService } from '../services/tenant.service';
import { map, take } from 'rxjs';

export const tenantGuard: CanActivateFn = (route, state) => {
  const tenantService = inject(MCTenantService);
  return tenantService.getCurrent().pipe(
    take(1),
    map((tenant) => tenant != undefined ? true : false)
  );
};
