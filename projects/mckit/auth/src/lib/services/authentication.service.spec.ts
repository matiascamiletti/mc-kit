import { TestBed } from '@angular/core/testing';

import { MCAuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: MCAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MCAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
