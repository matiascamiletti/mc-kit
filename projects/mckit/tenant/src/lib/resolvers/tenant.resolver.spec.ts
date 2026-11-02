import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tenantResolver } from './tenant.resolver';
import { MCTenant } from '../entities/mc_tenant';
import { MCTenantService } from '../services/tenant.service';

describe('tenantResolver', () => {
  let mockTenantService: jasmine.SpyObj<MCTenantService>;
  let currentTenant$: BehaviorSubject<MCTenant | undefined>;

  const executeResolver: ResolveFn<MCTenant> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => tenantResolver(...resolverParameters));

  beforeEach(() => {
    currentTenant$ = new BehaviorSubject<MCTenant | undefined>(undefined);
    mockTenantService = jasmine.createSpyObj<MCTenantService>('MCTenantService', ['getCurrent']);
    mockTenantService.getCurrent.and.returnValue(currentTenant$.asObservable());

    TestBed.configureTestingModule({
      providers: [
        { provide: MCTenantService, useValue: mockTenantService }
      ]
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('should filter out undefined and resolve first defined tenant', (done) => {
    const expectedTenant: MCTenant = { id: 99, name: 'Resolved Tenant' };
    const result$ = executeResolver({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot) as Observable<MCTenant>;

    result$.subscribe(resolved => {
      expect(resolved).toEqual(expectedTenant);
      done();
    });

    currentTenant$.next(expectedTenant);
  });
});
