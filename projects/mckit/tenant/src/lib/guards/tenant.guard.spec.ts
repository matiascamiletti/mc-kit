import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, provideRouter, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MCAuthenticationService } from '@mckit/auth';
import { firstValueFrom, Observable, of } from 'rxjs';
import { tenantGuard } from './tenant.guard';
import { tenantListGuard } from './tenant-list.guard';
import { MCTenantService } from '../services/tenant.service';
import { MCTenant } from '../entities/mc_tenant';

describe('Tenant Guards', () => {
  let mockTenantService: jasmine.SpyObj<MCTenantService>;
  let mockAuthService: jasmine.SpyObj<MCAuthenticationService>;
  let router: Router;
  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = {} as RouterStateSnapshot;

  const executeTenantGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => tenantGuard(...guardParameters));

  const executeTenantListGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => tenantListGuard(...guardParameters));

  beforeEach(() => {
    mockTenantService = jasmine.createSpyObj<MCTenantService>('MCTenantService', ['getCurrent', 'list', 'setCurrent']);
    mockAuthService = jasmine.createSpyObj<MCAuthenticationService>('MCAuthenticationService', ['getUser']);

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: MCTenantService, useValue: mockTenantService },
        { provide: MCAuthenticationService, useValue: mockAuthService }
      ]
    });

    router = TestBed.inject(Router);
  });

  describe('tenantGuard', () => {
    it('should allow activation when current tenant exists', async () => {
      mockTenantService.getCurrent.and.returnValue(of({ id: 1, name: 'Org' }));
      const result = await firstValueFrom(executeTenantGuard(mockRoute, mockState) as Observable<boolean | UrlTree>);
      expect(result).toBeTrue();
    });

    it('should redirect to /no-tenant when current tenant is undefined', async () => {
      mockTenantService.getCurrent.and.returnValue(of(undefined));
      const result = await firstValueFrom(executeTenantGuard(mockRoute, mockState) as Observable<boolean | UrlTree>);
      expect(router.serializeUrl(result as UrlTree)).toBe('/no-tenant');
    });
  });

  describe('tenantListGuard', () => {
    it('should redirect to /login when user is undefined', async () => {
      mockAuthService.getUser.and.returnValue(of(undefined as any));
      const result = await (executeTenantListGuard(mockRoute, mockState) as Promise<boolean | UrlTree>);
      expect(router.serializeUrl(result as UrlTree)).toBe('/login');
    });

    it('should return true when user and current tenant are defined', async () => {
      mockAuthService.getUser.and.returnValue(of({ id: 1 } as any));
      mockTenantService.getCurrent.and.returnValue(of({ id: 5, name: 'Current' }));
      const result = await (executeTenantListGuard(mockRoute, mockState) as Promise<boolean | UrlTree>);
      expect(result).toBeTrue();
    });

    it('should set first tenant from list and return true when no current tenant is set', async () => {
      const firstTenant: MCTenant = { id: 7, name: 'First Tenant' };
      mockAuthService.getUser.and.returnValue(of({ id: 1 } as any));
      mockTenantService.getCurrent.and.returnValue(of(undefined));
      mockTenantService.list.and.returnValue(of({ data: [firstTenant] }));

      const result = await (executeTenantListGuard(mockRoute, mockState) as Promise<boolean | UrlTree>);
      expect(mockTenantService.setCurrent).toHaveBeenCalledWith(firstTenant);
      expect(result).toBeTrue();
    });

    it('should redirect to /no-tenant when tenant list is empty', async () => {
      mockAuthService.getUser.and.returnValue(of({ id: 1 } as any));
      mockTenantService.getCurrent.and.returnValue(of(undefined));
      mockTenantService.list.and.returnValue(of({ data: [] }));

      const result = await (executeTenantListGuard(mockRoute, mockState) as Promise<boolean | UrlTree>);
      expect(router.serializeUrl(result as UrlTree)).toBe('/no-tenant');
    });
  });
});
