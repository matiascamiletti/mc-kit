import { TestBed } from '@angular/core/testing';

import { FilterOdataConverterService } from './filter-odata-converter.service';

describe('FilterOdataConverterService', () => {
  let service: FilterOdataConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterOdataConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
