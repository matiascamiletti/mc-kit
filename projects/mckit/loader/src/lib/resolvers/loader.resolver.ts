import { inject } from '@angular/core';
import { ResolveData, ResolveFn } from '@angular/router';
import { MCLoaderService } from '../services/loader.service';

export const mcLoaderResolver: ResolveFn<boolean> = (route, state) => {
  inject(MCLoaderService).hide();
  return true;
};

export const mcLoadedResolverData: ResolveData = {
  loaded: mcLoaderResolver
};
