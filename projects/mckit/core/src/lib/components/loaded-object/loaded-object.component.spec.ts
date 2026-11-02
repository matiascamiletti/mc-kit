import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { MCLoadedObject } from './loaded-object.component';
import { MCApiRestHttpService } from '../../services/api-rest-http.service';

describe('MCLoadedObject', () => {
  let component: MCLoadedObject;
  let fixture: ComponentFixture<MCLoadedObject>;
  let paramsSubject: BehaviorSubject<Record<string, any>>;
  let mockHttpService: jasmine.SpyObj<MCApiRestHttpService<any>>;

  beforeEach(async () => {
    paramsSubject = new BehaviorSubject<Record<string, any>>({ id: '123' });
    mockHttpService = jasmine.createSpyObj<MCApiRestHttpService<any>>('MCApiRestHttpService', ['get']);
    mockHttpService.get.and.returnValue(of({ id: '123', name: 'Test Object' }));

    await TestBed.configureTestingModule({
      imports: [MCLoadedObject],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: paramsSubject.asObservable()
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCLoadedObject);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('httpService', mockHttpService);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load object from route param and emit onLoaded', () => {
    const loadedSpy = spyOn(component.onLoaded, 'emit');
    fixture.detectChanges();

    expect(mockHttpService.get).toHaveBeenCalledWith('123');
    expect(loadedSpy).toHaveBeenCalledWith({ id: '123', name: 'Test Object' });
    expect(component.isLoading()).toBeFalse();
  });

  it('should emit onNoData when route param is missing', () => {
    paramsSubject.next({});
    const noDataSpy = spyOn(component.onNoData, 'emit');
    const loadedSpy = spyOn(component.onLoaded, 'emit');

    fixture.detectChanges();

    expect(noDataSpy).toHaveBeenCalled();
    expect(mockHttpService.get).not.toHaveBeenCalled();
    expect(loadedSpy).not.toHaveBeenCalled();
  });

  it('should use custom key input when provided', () => {
    paramsSubject.next({ slug: 'my-custom-slug' });
    fixture.componentRef.setInput('key', 'slug');
    const loadedSpy = spyOn(component.onLoaded, 'emit');

    fixture.detectChanges();

    expect(mockHttpService.get).toHaveBeenCalledWith('my-custom-slug');
    expect(loadedSpy).toHaveBeenCalled();
  });

  it('should show progress spinner while loading', () => {
    const responseSubject = new Subject<any>();
    mockHttpService.get.and.returnValue(responseSubject.asObservable());

    fixture.detectChanges();
    expect(component.isLoading()).toBeTrue();
    expect(fixture.nativeElement.querySelector('p-progress-spinner')).toBeTruthy();

    responseSubject.next({ id: '123' });
    responseSubject.complete();
    fixture.detectChanges();

    expect(component.isLoading()).toBeFalse();
    expect(fixture.nativeElement.querySelector('p-progress-spinner')).toBeNull();
  });

  it('should unsubscribe on destroy', () => {
    fixture.detectChanges();
    const unsubSpy = spyOn(component.subscription!, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubSpy).toHaveBeenCalled();
  });
});
