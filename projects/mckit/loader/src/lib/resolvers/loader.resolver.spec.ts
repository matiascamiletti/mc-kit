import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { mcLoadedResolverData, mcLoaderResolver } from './loader.resolver';
import { MCLoaderService } from '../services/loader.service';

describe('mcLoaderResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => mcLoaderResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created and hide loader on resolve', () => {
    const loaderService = TestBed.inject(MCLoaderService);
    expect(loaderService.isLoading()).toBeTrue();

    const result = executeResolver({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(result).toBeTrue();
    expect(loaderService.isLoading()).toBeFalse();
  });

  it('should export mcLoadedResolverData with loaded resolver', () => {
    expect(mcLoadedResolverData['loaded']).toBe(mcLoaderResolver);
  });
});
