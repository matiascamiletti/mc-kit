import { TestBed } from '@angular/core/testing';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { of, Subject } from 'rxjs';
import { MCHttpFormModalService } from './http-form-modal.service';
import { MCHttpFormModal } from '../components/http-form-modal/http-form-modal.component';
import { MCConfigHttpModalForm } from '../entities/mc-config-http-modal-form';
import { MCFooterModalForm } from '../components/footer-modal-form/footer-modal-form.component';

describe('MCHttpFormModalService', () => {
  let service: MCHttpFormModalService;
  let dialogServiceSpy: jasmine.SpyObj<DialogService>;
  let childLoaded$: Subject<MCHttpFormModal>;

  beforeEach(() => {
    childLoaded$ = new Subject<MCHttpFormModal>();
    dialogServiceSpy = jasmine.createSpyObj('DialogService', ['open']);
    dialogServiceSpy.open.and.returnValue({
      onChildComponentLoaded: childLoaded$.asObservable()
    } as unknown as DynamicDialogRef);

    TestBed.configureTestingModule({
      providers: [
        MCHttpFormModalService,
        { provide: DialogService, useValue: dialogServiceSpy }
      ]
    });
    service = TestBed.inject(MCHttpFormModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open MCHttpFormModal with MCFooterModalForm', () => {
    const config: MCConfigHttpModalForm = {
      title: 'HTTP Form',
      fields: [],
      item: {},
      http: () => of({})
    };

    const obs$ = service.open(config);
    expect(obs$).toBeTruthy();
    expect(dialogServiceSpy.open).toHaveBeenCalledWith(MCHttpFormModal, jasmine.objectContaining({
      header: 'HTTP Form',
      templates: { footer: MCFooterModalForm },
      data: config
    }));
  });

  it('should open MCHttpFormModal on the right via openRight', () => {
    const config: MCConfigHttpModalForm = {
      title: 'HTTP Right Form',
      fields: [],
      item: {},
      http: () => of({})
    };

    service.openRight(config);
    expect(config.position).toBe('right');
    expect(dialogServiceSpy.open).toHaveBeenCalledWith(MCHttpFormModal, jasmine.objectContaining({
      position: 'right',
      data: config
    }));
  });
});
