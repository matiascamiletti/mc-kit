import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { EMPTY, of, throwError } from 'rxjs';
import { authInterceptor, MC_AUTH_SKIP_INTERCEPTOR } from './auth.interceptor';
import { MC_AUTH_CONFIG } from '../entities/mc-auth-config';
import { MCAuthenticationService } from '../services/authentication.service';
import { MCUser } from '../entities/mc-user';

describe('authInterceptor', () => {
  let authServiceSpy: jasmine.SpyObj<MCAuthenticationService>;

  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('MCAuthenticationService', ['getUser', 'removeUser']);
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

  it('should pass through requests that do not match baseUrl', (done) => {
    const req = new HttpRequest('GET', 'https://external.com/items');
    interceptor(req, (passedReq) => {
      expect(passedReq).toBe(req);
      expect(authServiceSpy.getUser).not.toHaveBeenCalled();
      return of(new HttpResponse({ status: 200 }));
    }).subscribe(() => done());
  });

  it('should remove skip-interceptor header and skip auth when present', (done) => {
    const headers = new HttpHeaders().set(MC_AUTH_SKIP_INTERCEPTOR, 'true');
    const req = new HttpRequest('GET', 'https://api.example.com/public', { headers });

    interceptor(req, (passedReq) => {
      expect(passedReq.headers.has(MC_AUTH_SKIP_INTERCEPTOR)).toBeFalse();
      expect(passedReq.headers.has('Authorization')).toBeFalse();
      expect(authServiceSpy.getUser).not.toHaveBeenCalled();
      return of(new HttpResponse({ status: 200 }));
    }).subscribe(() => done());
  });

  it('should pass request without Authorization header when user is undefined', (done) => {
    authServiceSpy.getUser.and.returnValue(of(undefined));
    const req = new HttpRequest('GET', 'https://api.example.com/items');

    interceptor(req, (passedReq) => {
      expect(passedReq.headers.has('Authorization')).toBeFalse();
      return of(new HttpResponse({ status: 200 }));
    }).subscribe(() => done());
  });

  it('should attach Bearer token when user is authenticated', (done) => {
    const user = new MCUser();
    user.access_token = 'secret-jwt-token';
    authServiceSpy.getUser.and.returnValue(of(user));
    const req = new HttpRequest('GET', 'https://api.example.com/items');

    interceptor(req, (passedReq) => {
      expect(passedReq.headers.get('Authorization')).toBe('Bearer secret-jwt-token');
      return of(new HttpResponse({ status: 200 }));
    }).subscribe(() => done());
  });

  it('should call removeUser when 401 HttpResponse is received', (done) => {
    authServiceSpy.getUser.and.returnValue(of(undefined));
    const req = new HttpRequest('GET', 'https://api.example.com/items');

    interceptor(req, () => of(new HttpResponse({ status: 401 }))).subscribe(() => {
      expect(authServiceSpy.removeUser).toHaveBeenCalled();
      done();
    });
  });

  it('should call removeUser and rethrow on 401 HttpErrorResponse', (done) => {
    authServiceSpy.getUser.and.returnValue(of(undefined));
    const req = new HttpRequest('GET', 'https://api.example.com/items');
    const error = new HttpErrorResponse({ status: 401 });

    interceptor(req, () => throwError(() => error)).subscribe({
      error: (err) => {
        expect(err).toBe(error);
        expect(authServiceSpy.removeUser).toHaveBeenCalled();
        done();
      }
    });
  });
});
