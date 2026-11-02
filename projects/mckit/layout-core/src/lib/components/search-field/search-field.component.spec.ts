import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { StorageMap } from '@ngx-pwa/local-storage';
import { of } from 'rxjs';
import { MCSearchField } from './search-field.component';

describe('MCSearchField', () => {
  let component: MCSearchField;
  let fixture: ComponentFixture<MCSearchField>;
  let mockStorageMap: jasmine.SpyObj<StorageMap>;

  beforeEach(async () => {
    mockStorageMap = jasmine.createSpyObj<StorageMap>('StorageMap', ['get', 'set']);
    mockStorageMap.get.and.returnValue(of('saved-query'));
    mockStorageMap.set.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      imports: [MCSearchField],
      providers: [
        { provide: StorageMap, useValue: mockStorageMap }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCSearchField);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not access storage when key is undefined', () => {
    fixture.detectChanges();
    expect(mockStorageMap.get).not.toHaveBeenCalled();

    component.saveStorage('query');
    expect(mockStorageMap.set).not.toHaveBeenCalled();
  });

  it('should load from storage on init when key is set and hasStorage is true', () => {
    fixture.componentRef.setInput('key', 'users');
    fixture.detectChanges();

    expect(component.getKey()).toBe('users_search');
    expect(mockStorageMap.get as jasmine.Spy).toHaveBeenCalledWith('users_search');
    expect(component.input.value).toBe('saved-query');
  });

  it('should debounce input changes, emit onSearch, set loading/active signals, and save to storage', fakeAsync(() => {
    fixture.componentRef.setInput('key', 'orders');
    mockStorageMap.get.and.returnValue(of(''));
    fixture.detectChanges();
    tick(300);

    const searchSpy = spyOn(component.onSearch, 'emit');

    component.input.setValue('laptop');
    tick(300);

    expect(component.isLoading()).toBeTrue();
    expect(component.inputActive()).toBeTrue();
    expect(searchSpy).toHaveBeenCalledWith('laptop');
    expect(mockStorageMap.set).toHaveBeenCalledWith('orders_search', 'laptop');

    component.stopLoading();
    expect(component.isLoading()).toBeFalse();
  }));

  it('should not save or load storage when hasStorage is false', () => {
    fixture.componentRef.setInput('key', 'orders');
    fixture.componentRef.setInput('hasStorage', false);
    fixture.detectChanges();

    expect(mockStorageMap.get).not.toHaveBeenCalled();
    component.saveStorage('test');
    expect(mockStorageMap.set).not.toHaveBeenCalled();
  });

  it('should unsubscribe on destroy', () => {
    fixture.detectChanges();
    const unsubSpy = spyOn(component.inputSubscription!, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubSpy).toHaveBeenCalled();
  });
});
