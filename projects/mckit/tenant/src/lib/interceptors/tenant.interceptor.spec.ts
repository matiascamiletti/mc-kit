import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { MC_AUTH_CONFIG } from '@mckit/auth';
import { of } from 'rxjs';
import { tenantInterceptor } from './tenant.interceptor';
import { MCTenantService } from '../services/tenant.service';

describe('tenantInterceptor', () => {
  let mockTenantService: jasmine.SpyObj<MCTenantService>;

  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => tenantInterceptor(req, next));

  beforeEach(() => {
    mockTenantService = jasmine.createSpyObj<MCTenantService>('MCTenantService', ['getCurrent']);

    TestBed.configureTestingModule({
      providers: [
        { provide: MC_AUTH_CONFIG, useValue: { baseUrl: 'https://api.example.com' } },
        { provide: MCTenantService, useValue: mockTenantService }
      ]
    });
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should bypass requests that do not match baseUrl', (done) => {
    const req = new HttpRequest('GET', 'https://other-domain.com/data');
    interceptor(req, (forwardedReq) => {
      expect(forwardedReq.headers.has('X-Tenant-ID')).toBeFalse();
      return of(new HttpResponse({ status: 200 }));
    }).subscribe(() => done());
  });

  it('should attach X-Tenant-ID header when matching baseUrl and tenant is present', (done) => {
    mockTenantService.getCurrent.and.returnValue(of({ id: 42, name: 'Tenant 42' }));
    const req = new HttpRequest('GET', 'https://api.example.com/projects');

    interceptor(req, (forwardedReq) => {
      expect(forwardedReq.headers.get('X-Tenant-ID')).toBe('42');
      return of(new HttpResponse({ status: 200 }));
    }).subscribe(() => done());
  });

  it('should attach empty X-Tenant-ID header when tenant is undefined', (done) => {
    mockTenantService.getCurrent.and.returnValue(of(undefined));
    const req = new HttpRequest('GET', 'https://api.example.com/projects');

    interceptor(req, (forwardedReq) => {
      expect(forwardedReq.headers.get('X-Tenant-ID')).toBe('');
      return of(new HttpResponse({ status: 200 }));
    }).subscribe(() => done());
  });
});
