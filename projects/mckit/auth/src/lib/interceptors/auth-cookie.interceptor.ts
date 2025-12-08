import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MC_AUTH_CONFIG } from '../entities/mc-auth-config';

export const authCookieInterceptor: HttpInterceptorFn = (req, next) => {

  const config = inject(MC_AUTH_CONFIG);
  // Solo aplicar credenciales si la petición va a nuestra API
  if (req.url.startsWith(config.baseUrl)) {
    const reqWithCredentials = req.clone({
      withCredentials: true
    });
    return next(reqWithCredentials);
  }

  return next(req);
};
