import { TestBed } from '@angular/core/testing';

import { MCHttpFormModalService } from './http-form-modal.service';

describe('MCHttpFormModalService', () => {
  let service: MCHttpFormModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MCHttpFormModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
