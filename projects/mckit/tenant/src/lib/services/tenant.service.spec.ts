import { TestBed } from '@angular/core/testing';

import { MCTenantService } from './tenant.service';

describe('MCTenantService', () => {
  let service: MCTenantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MCTenantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
