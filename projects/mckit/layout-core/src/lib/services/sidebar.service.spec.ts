import { TestBed } from '@angular/core/testing';

import { MCSidebarService } from './sidebar.service';

describe('SidebarService', () => {
  let service: MCSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MCSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
