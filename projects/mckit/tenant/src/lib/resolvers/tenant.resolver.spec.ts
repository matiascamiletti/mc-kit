import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { tenantResolver } from './tenant.resolver';
import { MCTenant } from '../entities/mc_tenant';

describe('tenantResolver', () => {
  const executeResolver: ResolveFn<MCTenant> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => tenantResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
