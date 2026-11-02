import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RedirectCommand, Router, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { mcAuthGuard } from './auth.guard';
import { MCAuthenticationService } from '../services/authentication.service';
import { MCUser } from '../entities/mc-user';

describe('mcAuthGuard', () => {
  let authServiceSpy: jasmine.SpyObj<MCAuthenticationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => mcAuthGuard(...guardParameters));

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('MCAuthenticationService', ['getUser']);
    routerSpy = jasmine.createSpyObj('Router', ['parseUrl']);
    routerSpy.parseUrl.and.callFake((url: string) => ({ toString: () => url, queryParams: {} } as any));
    (routerSpy as any).url = '/dashboard';

    TestBed.configureTestingModule({
      providers: [
        { provide: MCAuthenticationService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should redirect to /login with redirect query param when user is undefined', (done) => {
    authServiceSpy.getUser.and.returnValue(of(undefined));

    const result$ = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot) as any;
    result$.subscribe((res: any) => {
      expect(res instanceof RedirectCommand).toBeTrue();
      expect(routerSpy.parseUrl).toHaveBeenCalledWith('/login');
      expect(res.redirectTo.queryParams).toEqual({ redirect: '/dashboard' });
      done();
    });
  });

  it('should set empty redirect query param if current url includes /login', (done) => {
    (routerSpy as any).url = '/login?foo=bar';
    authServiceSpy.getUser.and.returnValue(of(undefined));

    const result$ = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot) as any;
    result$.subscribe((res: any) => {
      expect(res instanceof RedirectCommand).toBeTrue();
      expect(res.redirectTo.queryParams).toEqual({ redirect: '' });
      done();
    });
  });

  it('should return true when user is authenticated', (done) => {
    const user = new MCUser();
    user.id = 1;
    authServiceSpy.getUser.and.returnValue(of(user));

    const result$ = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot) as any;
    result$.subscribe((res: any) => {
      expect(res).toBeTrue();
      done();
    });
  });
});
