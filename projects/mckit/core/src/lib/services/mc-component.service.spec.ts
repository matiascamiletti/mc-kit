import { TestBed } from '@angular/core/testing';

import { McComponentService } from './mc-component.service';

describe('McComponentService', () => {
  let service: McComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(McComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
