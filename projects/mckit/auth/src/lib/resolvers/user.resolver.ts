import { ResolveFn } from '@angular/router';
import { MCAuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';
import { MCUser } from '../entities/mc-user';

export const mcUserResolver: ResolveFn<MCUser|undefined> = (route, state) => {
  const authService = inject(MCAuthenticationService);

  return authService.getUser();
};
