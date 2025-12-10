import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MCTenantService } from '../services/tenant.service';
import { map, of, switchMap, take } from 'rxjs';
import { MCTenant } from '@mckit/tenant';

export const tenantListGuard: CanActivateFn = (route, state) => {
    const tenantService = inject(MCTenantService);
    const router = inject(Router);

    return tenantService.getCurrent().pipe(
        switchMap((tenant: MCTenant | undefined) => {
            if (tenant != undefined) {
                return of(true);
            }
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
        })
    );
};
