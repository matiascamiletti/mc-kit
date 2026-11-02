import { TestBed } from '@angular/core/testing';
import { MonacoFieldService } from './monaco-field.service';

describe('MonacoFieldService', () => {
  let service: MonacoFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonacoFieldService);
  });

  it('should be created with empty completionProviders', () => {
    expect(service).toBeTruthy();
    expect(service.completionProviders.length).toBe(0);
  });

  it('should add and dispose completion providers on cleanCompletionProviders', () => {
    const provider1 = { dispose: jasmine.createSpy('dispose1') };
    const provider2 = { dispose: jasmine.createSpy('dispose2') };

    service.addCompletionProvider(provider1);
    service.addCompletionProvider(provider2);
    expect(service.completionProviders.length).toBe(2);

    service.cleanCompletionProviders();
    expect(provider1.dispose).toHaveBeenCalled();
    expect(provider2.dispose).toHaveBeenCalled();
    expect(service.completionProviders.length).toBe(0);
  });
});
