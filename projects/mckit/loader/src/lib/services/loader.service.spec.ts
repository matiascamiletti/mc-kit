import { TestBed } from '@angular/core/testing';
import { MCLoaderService } from './loader.service';

describe('MCLoaderService', () => {
  let service: MCLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MCLoaderService);
  });

  it('should be created with isLoading initially true', () => {
    expect(service).toBeTruthy();
    expect(service.isLoading()).toBeTrue();
  });

  it('should set isLoading to false when hide() is called', () => {
    service.hide();
    expect(service.isLoading()).toBeFalse();
  });

  it('should set isLoading to true when show() is called after hide()', () => {
    service.hide();
    expect(service.isLoading()).toBeFalse();
    service.show();
    expect(service.isLoading()).toBeTrue();
  });
});
