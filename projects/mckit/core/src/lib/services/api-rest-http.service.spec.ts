import { TestBed } from '@angular/core/testing';

import { ApiRestHttpService } from './api-rest-http.service';

describe('ApiRestHttpService', () => {
  let service: ApiRestHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRestHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
