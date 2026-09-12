import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { mcAuthAccessGuard } from './mc-auth-access.guard';
import { MCAuthenticationService } from '../services/authentication.service';
import { MCPermissionService } from '../services/mc-permission.service';
import { MCUser } from '../entities/mc-user';

describe('mcAuthAccessGuard', () => {
  let authServiceSpy: jasmine.SpyObj<MCAuthenticationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('MCAuthenticationService', ['getUser']);
    routerSpy = jasmine.createSpyObj('Router', ['parseUrl']);
    routerSpy.parseUrl.and.callFake((url: string) => ({ toString: () => url } as any));
    (routerSpy as any).url = '/current';

    TestBed.configureTestingModule({
      providers: [
        MCPermissionService,
        { provide: MCAuthenticationService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
  });

  it('should redirect to login if unauthenticated', (done) => {
    authServiceSpy.getUser.and.returnValue(of(undefined));

    const route = {
      data: { roles: ['admin'] },
    } as unknown as ActivatedRouteSnapshot;

    TestBed.runInInjectionContext(() => {
      const result$ = mcAuthAccessGuard(route, {} as RouterStateSnapshot) as any;
      result$.subscribe((result: any) => {
        expect(result).not.toBeTrue();
        done();
      });
    });
  });

  it('should allow access if authenticated and authorized', (done) => {
    const user = new MCUser();
    user.roles = ['admin'];
    user.permissions = ['users:read'];
    authServiceSpy.getUser.and.returnValue(of(user));

    const route = {
      data: { roles: ['admin'], permissions: ['users:read'] },
    } as unknown as ActivatedRouteSnapshot;

    TestBed.runInInjectionContext(() => {
      const result$ = mcAuthAccessGuard(route, {} as RouterStateSnapshot) as any;
      result$.subscribe((result: any) => {
        expect(result).toBeTrue();
        done();
      });
    });
  });
});
