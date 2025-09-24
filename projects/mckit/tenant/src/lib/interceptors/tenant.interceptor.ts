import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MCTenantService } from '../services/tenant.service';
import { MC_AUTH_CONFIG } from '@mckit/auth';
import { switchMap, take } from 'rxjs';

export const tenantInterceptor: HttpInterceptorFn = (req, next) => {

  const config = inject(MC_AUTH_CONFIG);
  const tenantService = inject(MCTenantService);

  if(req.url.indexOf(config.baseUrl) == -1){
    return next(req);
  }

  return tenantService.getCurrent()
  .pipe(
    take(1),
    switchMap(tenant => {
      return next(req.clone({
        headers: req.headers.set('X-Tenant-ID', tenant ? (tenant.id + '') : '')
      }));
    })
  );
};
