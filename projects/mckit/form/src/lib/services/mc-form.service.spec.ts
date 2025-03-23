import { TestBed } from '@angular/core/testing';

import { MCFormService } from './mc-form.service';

describe('MCFormService', () => {
  let service: MCFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MCFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
