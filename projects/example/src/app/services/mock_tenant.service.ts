import { Injectable } from '@angular/core';
import { MCApiRestHttpService, MCListResponse } from '@mckit/core';
import { Observable, of } from 'rxjs';
import { MCTenant, MCTenantService } from '../../../../mckit/tenant/src/public-api';

@Injectable({
  providedIn: 'root'
})
export class MockTenantService extends MCTenantService {

  override list(queryParams?: string): Observable<MCListResponse<MCTenant>> {
    return of(
      { data: [
        { id: '1', name: 'Secondary Tenant' },
        { id: '2', name: 'Tenant 2' },
        { id: '3', name: 'Tenant 3' }
      ] }
    );
  }
}
