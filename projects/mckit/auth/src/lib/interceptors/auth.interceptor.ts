import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MC_AUTH_CONFIG } from '../entities/mc-auth-config';
import { MCAuthenticationService } from '../services/authentication.service';
import { catchError, switchMap, tap } from 'rxjs';

export const MC_AUTH_SKIP_INTERCEPTOR = 'skip-interceptor';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const config = inject(MC_AUTH_CONFIG);
  const authService = inject(MCAuthenticationService);

  if(req.url.indexOf(config.baseUrl) == -1){
    return next(req);
  }

  if (req.headers.has(MC_AUTH_SKIP_INTERCEPTOR)) {
    const clonedReq = req.clone({ headers: req.headers.delete(MC_AUTH_SKIP_INTERCEPTOR) });
    return next(clonedReq);
  }

  return authService.getUser()
  .pipe(

    switchMap(user => {

      if(user == undefined){
        return next(req);
      }

      return next(req.clone({
        headers: req.headers.set('Authorization', `Bearer ${user.access_token}`)
      }));

    }),
    tap(event => {

      if(event instanceof HttpResponse && event.status == 401){
        authService.removeUser().subscribe(() => {
          window.location.reload();
        });
      }

    }),
    catchError(err => {

      if(err instanceof HttpErrorResponse && err.status == 401){
        authService.removeUser().subscribe(() => {
          window.location.reload();
        });
      }

      throw err;
    }),


  );
};
