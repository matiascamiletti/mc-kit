import { TestBed } from '@angular/core/testing';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { MCFormModalService } from './form-modal.service';
import { MCConfigModalForm } from '../entities/mc-config-modal-form';
import { MCFormModal } from '../components/form-modal/form-modal.component';
import { MCFooterModalForm } from '../components/footer-modal-form/footer-modal-form.component';
import { MCFooterWithDeleteModalForm } from '../components/footer-with-delete-modal-form/footer-with-delete-modal-form.component';

describe('MCFormModalService', () => {
  let service: MCFormModalService;
  let dialogServiceSpy: jasmine.SpyObj<DialogService>;
  let childLoaded$: Subject<MCFormModal>;

  beforeEach(() => {
    childLoaded$ = new Subject<MCFormModal>();
    dialogServiceSpy = jasmine.createSpyObj('DialogService', ['open']);
    dialogServiceSpy.open.and.returnValue({
      onChildComponentLoaded: childLoaded$.asObservable()
    } as unknown as DynamicDialogRef);

    TestBed.configureTestingModule({
      providers: [
        MCFormModalService,
        { provide: DialogService, useValue: dialogServiceSpy }
      ]
    });
    service = TestBed.inject(MCFormModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open modal with default footer', () => {
    const config: MCConfigModalForm = {
      title: 'Test Modal',
      fields: [],
      item: { id: 1 }
    };

    const obs$ = service.open(config);
    expect(obs$).toBeTruthy();
    expect(dialogServiceSpy.open).toHaveBeenCalledWith(MCFormModal, jasmine.objectContaining({
      header: 'Test Modal',
      templates: { footer: MCFooterModalForm },
      data: config
    }));
  });

  it('should open modal with delete footer when withDelete is true or openWithDelete is called', () => {
    const config: MCConfigModalForm = {
      title: 'Delete Modal',
      fields: [],
      item: { id: 1 }
    };

    service.openWithDelete(config);
    expect(dialogServiceSpy.open).toHaveBeenCalledWith(MCFormModal, jasmine.objectContaining({
      header: 'Delete Modal',
      templates: { footer: MCFooterWithDeleteModalForm },
      data: config
    }));
  });

  it('should open modal on the right with default right config via openRight and openRightWithDelete', () => {
    const config: MCConfigModalForm = {
      title: 'Right Modal',
      fields: [],
      item: {}
    };

    service.openRight(config);
    expect(config.position).toBe('right');
    expect(config.styleClass).toBe('w-full md:w-2xl mc-form-modal');
    expect(dialogServiceSpy.open).toHaveBeenCalledWith(MCFormModal, jasmine.objectContaining({
      position: 'right',
      templates: { footer: MCFooterModalForm }
    }));

    service.openRightWithDelete({ title: 'Right Delete', fields: [], item: {} });
    expect(dialogServiceSpy.open).toHaveBeenCalledWith(MCFormModal, jasmine.objectContaining({
      position: 'right',
      templates: { footer: MCFooterWithDeleteModalForm }
    }));
  });
});
