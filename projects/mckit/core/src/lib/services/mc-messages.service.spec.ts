import { TestBed } from '@angular/core/testing';

import { McMessagesService } from './mc-messages.service';

describe('McMessagesService', () => {
  let service: McMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(McMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
