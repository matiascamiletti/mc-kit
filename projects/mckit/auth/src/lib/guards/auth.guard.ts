import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { MCAuthenticationService } from '../services/authentication.service';
import { map } from 'rxjs';

export const mcAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(MCAuthenticationService);

  let paramRedirect = router.url;
  if (paramRedirect.includes('/login')) {
    paramRedirect = '';
  }

  return authService.getUser()
  .pipe(map(user => {
    if(user == undefined){
      const loginPath = router.parseUrl("/login");
      loginPath.queryParams = {
        redirect: paramRedirect
      };
      return new RedirectCommand(loginPath, { skipLocationChange: true });
    }

    return true;
  }));
};
