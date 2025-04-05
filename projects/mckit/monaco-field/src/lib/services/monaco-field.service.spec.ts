import { TestBed } from '@angular/core/testing';

import { MonacoFieldService } from './monaco-field.service';

describe('MonacoFieldService', () => {
  let service: MonacoFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonacoFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
