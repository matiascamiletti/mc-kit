import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MC_AUTH_CONFIG } from '../entities/mc-auth-config';
import { MCAuthenticationService } from '../services/authentication.service';
import { catchError, tap } from 'rxjs';

export const authCookieInterceptor: HttpInterceptorFn = (req, next) => {

  const config = inject(MC_AUTH_CONFIG);
  const authService = inject(MCAuthenticationService);

  // Solo aplicar credenciales si la petición va a nuestra API
  if (req.url.startsWith(config.baseUrl)) {
    const reqWithCredentials = req.clone({
      withCredentials: true
    });
    return next(reqWithCredentials).pipe(
      tap(event => {
        if (event instanceof HttpResponse && event.status == 401) {
          authService.removeUser().subscribe(() => {
            window.location.reload();
          });
        }
      }),
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status == 401) {
          authService.removeUser().subscribe(() => {
            window.location.reload();
          });
        }
        throw err;
      })
    );
  }

  return next(req);
};
