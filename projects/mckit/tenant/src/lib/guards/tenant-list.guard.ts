import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MCTenantService } from '../services/tenant.service';
import { firstValueFrom } from 'rxjs';
import { MCAuthenticationService } from '@mckit/auth';

export const tenantListGuard: CanActivateFn = async (route, state) => {
    const tenantService = inject(MCTenantService);
    const router = inject(Router);
    const authService = inject(MCAuthenticationService);

    const user = await firstValueFrom(authService.getUser());

    if (user == undefined) {
        return router.createUrlTree(['/login']);
    }

    const tenant = await firstValueFrom(tenantService.getCurrent());

    if (tenant != undefined) {
        return true;
    }

    const tenants = await firstValueFrom(tenantService.list());

    if (tenants.data.length > 0) {
        tenantService.setCurrent(tenants.data[0]);
        return true;
    }

    return router.createUrlTree(['/no-tenant']);
};
