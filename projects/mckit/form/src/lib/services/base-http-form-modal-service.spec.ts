import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { MCBaseHttpFormModalConfig, MCBaseHttpFormModalService } from './base-http-form-modal-service';
import { MCHttpFormModalService } from './http-form-modal.service';
import { MCField } from '../entities/mc-field';
import { MCEventModalForm } from '../entities/mc-event-modal-form';
import { MCHttpFormModal } from '../components/http-form-modal/http-form-modal.component';
import { MCApiRestHttpService } from '@mckit/core';

interface TestEntity {
  id?: number;
  name?: string;
}

@Injectable()
class ConcreteHttpFormModalService extends MCBaseHttpFormModalService<TestEntity> {
  override getFields(): Array<MCField> {
    return [MCField.init({ key: 'name', component: null })];
  }
}

describe('MCBaseHttpFormModalService', () => {
  let service: ConcreteHttpFormModalService;
  let httpModalServiceSpy: jasmine.SpyObj<MCHttpFormModalService>;
  let apiServiceSpy: jasmine.SpyObj<MCApiRestHttpService<TestEntity>>;
  let eventSubject: Subject<MCEventModalForm>;

  beforeEach(() => {
    eventSubject = new Subject<MCEventModalForm>();
    const fakeModal = {
      getEventObs: () => eventSubject
    } as unknown as MCHttpFormModal;

    httpModalServiceSpy = jasmine.createSpyObj('MCHttpFormModalService', ['open', 'openRight']);
    httpModalServiceSpy.open.and.returnValue(of(fakeModal));
    httpModalServiceSpy.openRight.and.returnValue(of(fakeModal));

    apiServiceSpy = jasmine.createSpyObj('MCApiRestHttpService', ['create', 'update']);
    apiServiceSpy.create.and.returnValue(of({ id: 1, name: 'Created' }));
    apiServiceSpy.update.and.returnValue(of({ id: 2, name: 'Updated' }));

    TestBed.configureTestingModule({
      providers: [
        ConcreteHttpFormModalService,
        { provide: MCHttpFormModalService, useValue: httpModalServiceSpy }
      ]
    });

    service = TestBed.inject(ConcreteHttpFormModalService);
  });

  it('should be created and build config properly', () => {
    expect(service).toBeTruthy();
    const baseConfig = new MCBaseHttpFormModalConfig('Edit Item', apiServiceSpy, { id: 2, name: 'Test' });
    const modalConfig = service.getConfig(baseConfig);

    expect(modalConfig.title).toBe('Edit Item');
    expect(modalConfig.fields.length).toBe(1);

    modalConfig.http({ name: 'New' }).subscribe();
    expect(apiServiceSpy.create).toHaveBeenCalledWith({ name: 'New' });

    modalConfig.http({ id: 2, name: 'Existing' }).subscribe();
    expect(apiServiceSpy.update).toHaveBeenCalledWith({ id: 2, name: 'Existing' });
  });

  it('should open and openRight and switchMap to dialog event observable', () => {
    const baseConfig = new MCBaseHttpFormModalConfig('Modal', apiServiceSpy);
    const received: MCEventModalForm[] = [];

    service.open(baseConfig).subscribe(ev => received.push(ev));
    expect(httpModalServiceSpy.open).toHaveBeenCalled();

    service.openRight(baseConfig).subscribe(ev => received.push(ev));
    expect(httpModalServiceSpy.openRight).toHaveBeenCalled();

    eventSubject.next({ key: 'saved', content: { id: 1 } });
    expect(received.length).toBe(2);
    expect(received[0].key).toBe('saved');
  });
});
