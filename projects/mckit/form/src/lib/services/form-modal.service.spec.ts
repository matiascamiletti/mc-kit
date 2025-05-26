import { TestBed } from '@angular/core/testing';

import { MCFormModalService } from './form-modal.service';

describe('MCFormModalService', () => {
  let service: MCFormModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MCFormModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
