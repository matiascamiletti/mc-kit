import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { of } from 'rxjs';
import { mcRoleGuard, createRoleGuard } from './mc-role.guard';
import { MCAuthenticationService } from '../services/authentication.service';
import { MCPermissionService } from '../services/mc-permission.service';
import { MCUser } from '../entities/mc-user';

describe('mcRoleGuard', () => {
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

  it('should allow access if user has the role', (done) => {
    const user = new MCUser();
    user.roles = ['admin'];
    authServiceSpy.getUser.and.returnValue(of(user));

    const route = {
      data: { roles: ['admin'] },
    } as unknown as ActivatedRouteSnapshot;

    TestBed.runInInjectionContext(() => {
      const result$ = mcRoleGuard(route, {} as RouterStateSnapshot) as any;
      result$.subscribe((result: any) => {
        expect(result).toBeTrue();
        done();
      });
    });
  });

  it('should deny or redirect if user lacks role', (done) => {
    const user = new MCUser();
    user.roles = ['viewer'];
    authServiceSpy.getUser.and.returnValue(of(user));

    const route = {
      data: { roles: ['admin'], redirectTo: '/forbidden' },
    } as unknown as ActivatedRouteSnapshot;

    TestBed.runInInjectionContext(() => {
      const result$ = mcRoleGuard(route, {} as RouterStateSnapshot) as any;
      result$.subscribe((result: any) => {
        expect(result).not.toBeTrue();
        done();
      });
    });
  });

  it('should work with createRoleGuard factory', (done) => {
    const user = new MCUser();
    user.roles = ['manager'];
    authServiceSpy.getUser.and.returnValue(of(user));

    const guard = createRoleGuard('manager');

    TestBed.runInInjectionContext(() => {
      const result$ = guard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot) as any;
      result$.subscribe((result: any) => {
        expect(result).toBeTrue();
        done();
      });
    });
  });
});
