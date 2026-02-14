import { TestBed } from '@angular/core/testing';

import { MCChatService } from './chat.service';

describe('MCChatService', () => {
  let service: MCChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MCChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
