import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MCTenantService } from '../services/tenant.service';
import { map, take } from 'rxjs';

export const tenantListGuard: CanActivateFn = (route, state) => {
    const tenantService = inject(MCTenantService);
    const router = inject(Router);

    return tenantService.list().pipe(
        take(1),
        map((tenants) => {
            if (tenants.data.length > 0) {
                tenantService.setCurrent(tenants.data[0]);
                return true;
            }
            return router.createUrlTree(['/no-tenant']);
        })
    );
};
