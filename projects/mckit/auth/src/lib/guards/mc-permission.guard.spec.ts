import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { mcPermissionGuard, createPermissionGuard } from './mc-permission.guard';
import { MCAuthenticationService } from '../services/authentication.service';
import { MCPermissionService } from '../services/mc-permission.service';
import { MCUser } from '../entities/mc-user';

describe('mcPermissionGuard', () => {
  let authServiceSpy: jasmine.SpyObj<MCAuthenticationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('MCAuthenticationService', ['getUser']);
    routerSpy = jasmine.createSpyObj('Router', ['parseUrl']);
    routerSpy.parseUrl.and.callFake((url: string) => ({ toString: () => url } as any));

    TestBed.configureTestingModule({
      providers: [
        MCPermissionService,
        { provide: MCAuthenticationService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
  });

  it('should allow access if user has permission', (done) => {
    const user = new MCUser();
    user.permissions = ['users:read'];
    authServiceSpy.getUser.and.returnValue(of(user));

    const route = {
      data: { permissions: ['users:read'] },
    } as unknown as ActivatedRouteSnapshot;

    TestBed.runInInjectionContext(() => {
      const result$ = mcPermissionGuard(route, {} as RouterStateSnapshot) as any;
      result$.subscribe((result: any) => {
        expect(result).toBeTrue();
        done();
      });
    });
  });

  it('should deny access if user lacks permission', (done) => {
    const user = new MCUser();
    user.permissions = ['users:read'];
    authServiceSpy.getUser.and.returnValue(of(user));

    const route = {
      data: { permissions: ['users:delete'], redirectTo: '/forbidden' },
    } as unknown as ActivatedRouteSnapshot;

    TestBed.runInInjectionContext(() => {
      const result$ = mcPermissionGuard(route, {} as RouterStateSnapshot) as any;
      result$.subscribe((result: any) => {
        expect(result).not.toBeTrue();
        done();
      });
    });
  });

  it('should work with createPermissionGuard factory', (done) => {
    const user = new MCUser();
    user.permissions = ['reports:export'];
    authServiceSpy.getUser.and.returnValue(of(user));

    const guard = createPermissionGuard('reports:export');

    TestBed.runInInjectionContext(() => {
      const result$ = guard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot) as any;
      result$.subscribe((result: any) => {
        expect(result).toBeTrue();
        done();
      });
    });
  });
});
