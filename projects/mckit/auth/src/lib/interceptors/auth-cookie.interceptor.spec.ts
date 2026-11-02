import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { EMPTY, of, throwError } from 'rxjs';
import { authCookieInterceptor } from './auth-cookie.interceptor';
import { MC_AUTH_CONFIG } from '../entities/mc-auth-config';
import { MCAuthenticationService } from '../services/authentication.service';

describe('authCookieInterceptor', () => {
  let authServiceSpy: jasmine.SpyObj<MCAuthenticationService>;

  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authCookieInterceptor(req, next));

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('MCAuthenticationService', ['removeUser']);
    authServiceSpy.removeUser.and.returnValue(EMPTY);

    TestBed.configureTestingModule({
      providers: [
        { provide: MC_AUTH_CONFIG, useValue: { baseUrl: 'https://api.example.com' } },
        { provide: MCAuthenticationService, useValue: authServiceSpy }
      ]
    });
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add withCredentials=true for requests matching baseUrl', (done) => {
    const req = new HttpRequest('GET', 'https://api.example.com/data');
    interceptor(req, (clonedReq) => {
      expect(clonedReq.withCredentials).toBeTrue();
      return of(new HttpResponse({ status: 200 }));
    }).subscribe(() => {
      done();
    });
  });

  it('should not add withCredentials for external requests', (done) => {
    const req = new HttpRequest('GET', 'https://other.domain.com/data');
    interceptor(req, (passedReq) => {
      expect(passedReq.withCredentials).toBeFalse();
      return of(new HttpResponse({ status: 200 }));
    }).subscribe(() => {
      done();
    });
  });

  it('should call removeUser when 401 HttpResponse is received', (done) => {
    const req = new HttpRequest('GET', 'https://api.example.com/data');
    interceptor(req, () => of(new HttpResponse({ status: 401 }))).subscribe(() => {
      expect(authServiceSpy.removeUser).toHaveBeenCalled();
      done();
    });
  });

  it('should call removeUser and rethrow when 401 HttpErrorResponse is thrown', (done) => {
    const req = new HttpRequest('GET', 'https://api.example.com/data');
    const error = new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' });
    interceptor(req, () => throwError(() => error)).subscribe({
      error: (err) => {
        expect(err).toBe(error);
        expect(authServiceSpy.removeUser).toHaveBeenCalled();
        done();
      }
    });
  });
});
