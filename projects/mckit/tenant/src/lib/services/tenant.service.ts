import { inject, Injectable } from '@angular/core';
import { MCApiRestHttpService } from '@mckit/core';
import { MCTenant } from '../entities/mc_tenant';
import { MC_AUTH_CONFIG } from '@mckit/auth';
import { BehaviorSubject, map, Observable, skipWhile, tap } from 'rxjs';
import { StorageMap } from '@ngx-pwa/local-storage';

export const MC_TENANT_KEY_STORAGE = 'mc.tenant.storage';

@Injectable({
  providedIn: 'root'
})
export class MCTenantService extends MCApiRestHttpService<MCTenant> {

  config = inject(MC_AUTH_CONFIG);
  storage = inject(StorageMap);

  override pathModel = '/tenants';

  current = new BehaviorSubject<MCTenant|undefined>(undefined);
  isInitialized = false;

  constructor() {
    super();
    this.baseUrl = this.config.baseUrl;
    this.initialize();
  }

  getCurrent(): Observable<MCTenant|undefined> {
    return this.current.asObservable();
  }

  setCurrent(tenant: MCTenant|undefined) {
    this.isInitialized = true;
    this.current.next(tenant);
    if(tenant == undefined){
      this.removeCurrentFromStorage().subscribe();
    } else {
      this.saveCurrentInStorage(tenant).subscribe();
    }
  }

  saveCurrentInStorage(tenant: MCTenant): Observable<undefined> {
    return this.storage.set(MC_TENANT_KEY_STORAGE, JSON.stringify(tenant), { type: 'string' });
  }

  getCurrentFromStorage(): Observable<MCTenant|undefined> {
    return this.storage.get(MC_TENANT_KEY_STORAGE, { type: 'string' })
    .pipe(map(data => {
      if(data == undefined||data == ''){
        return undefined;
      }
      return JSON.parse(data);
    }));
  }

  removeCurrentFromStorage(): Observable<undefined> {
    return this.storage.delete(MC_TENANT_KEY_STORAGE);
  }

  initialize() {
    this.getCurrentFromStorage()
    .pipe(
      skipWhile(() => this.isInitialized),
      tap(tenant => this.setCurrent(tenant))
    )
    .subscribe();
  }
}
