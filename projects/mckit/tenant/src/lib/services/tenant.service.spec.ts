import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MC_AUTH_CONFIG } from '@mckit/auth';
import { StorageMap } from '@ngx-pwa/local-storage';
import { of } from 'rxjs';
import { MC_TENANT_KEY_STORAGE, MCTenantService } from './tenant.service';
import { MCTenant } from '../entities/mc_tenant';

describe('MCTenantService', () => {
  let service: MCTenantService;
  let mockStorage: jasmine.SpyObj<StorageMap>;
  const mockTenant: MCTenant = { id: 10, name: 'Acme Corp' };

  beforeEach(() => {
    mockStorage = jasmine.createSpyObj<StorageMap>('StorageMap', ['get', 'set', 'delete']);
    mockStorage.get.and.returnValue(of(JSON.stringify(mockTenant)));
    mockStorage.set.and.returnValue(of(undefined));
    mockStorage.delete.and.returnValue(of(undefined));

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MC_AUTH_CONFIG, useValue: { baseUrl: 'https://api.example.com/' } },
        { provide: StorageMap, useValue: mockStorage }
      ]
    });
    service = TestBed.inject(MCTenantService);
  });

  it('should be created and initialize current tenant from storage', (done) => {
    expect(service).toBeTruthy();
    expect(service.endpoint).toBe('https://api.example.com/tenants');

    service.getCurrent().subscribe(tenant => {
      expect(tenant).toEqual(mockTenant);
      done();
    });
  });

  it('should save tenant to storage when setCurrent is called with a tenant', () => {
    const newTenant: MCTenant = { id: 20, name: 'Beta LLC' };
    service.setCurrent(newTenant);

    expect(mockStorage.set).toHaveBeenCalledWith(
      MC_TENANT_KEY_STORAGE,
      JSON.stringify(newTenant),
      { type: 'string' }
    );
  });

  it('should remove tenant from storage when setCurrent is called with undefined', () => {
    service.setCurrent(undefined);
    expect(mockStorage.delete).toHaveBeenCalledWith(MC_TENANT_KEY_STORAGE);
  });

  it('should return undefined from getCurrentFromStorage when storage is empty', (done) => {
    mockStorage.get.and.returnValue(of(''));
    service.getCurrentFromStorage().subscribe(res => {
      expect(res).toBeUndefined();
      done();
    });
  });

  it('should emit click, click-current, and click-new events on onEvent', () => {
    const events: Array<{ type: string; tenant: MCTenant | undefined }> = [];
    service.onEvent.subscribe(ev => events.push(ev));

    service.clickTenant(mockTenant);
    service.clickCurrent(mockTenant);
    service.clickNew();

    expect(events).toEqual([
      { type: 'click', tenant: mockTenant },
      { type: 'click-current', tenant: mockTenant },
      { type: 'click-new', tenant: undefined }
    ]);
  });
});
