import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { DialogService, DynamicDialog, DynamicDialogRef } from 'primeng/dynamicdialog';
import { config as rxjsConfig, of, throwError } from 'rxjs';
import { MCHttpFormModal } from './http-form-modal.component';
import { MCConfigHttpModalForm } from '../../entities/mc-config-http-modal-form';
import { HiddenField } from '../../fields/hidden-field/hidden-field.component';
import { MCEventModalForm } from '../../entities/mc-event-modal-form';

describe('MCHttpFormModal', () => {
  let component: MCHttpFormModal;
  let fixture: ComponentFixture<MCHttpFormModal>;
  let dialogServiceSpy: jasmine.SpyObj<DialogService>;
  let dialogRefSpy: jasmine.SpyObj<DynamicDialogRef>;
  let mockConfig: MCConfigHttpModalForm;
  let httpSpy: jasmine.Spy;

  beforeEach(async () => {
    httpSpy = jasmine.createSpy('http').and.returnValue(of({ id: 99, title: 'SavedTitle' }));
    mockConfig = {
      fields: [HiddenField.init('title', 'DefaultTitle')],
      item: { title: 'InitialTitle' },
      http: httpSpy
    };

    dialogServiceSpy = jasmine.createSpyObj('DialogService', ['getInstance']);
    dialogRefSpy = jasmine.createSpyObj('DynamicDialogRef', ['close']);
    dialogServiceSpy.getInstance.and.returnValue({
      data: mockConfig
    } as unknown as DynamicDialog);

    await TestBed.configureTestingModule({
      imports: [MCHttpFormModal],
      providers: [
        { provide: DialogService, useValue: dialogServiceSpy },
        { provide: DynamicDialogRef, useValue: dialogRefSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCHttpFormModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call http on submit event, emit saved event, and close dialog', () => {
    const events: MCEventModalForm[] = [];
    component.getEventObs().subscribe(ev => events.push(ev));

    component.emitEvent({ key: 'submit', content: { title: 'SubmittedTitle' } });

    expect(httpSpy).toHaveBeenCalledWith({ title: 'SubmittedTitle' });
    expect(events.some(e => e.key === 'saved' && e.content?.id === 99)).toBeTrue();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should emit stop-loading and show toast message when http fails', fakeAsync(() => {
    const prevHandler = rxjsConfig.onUnhandledError;
    rxjsConfig.onUnhandledError = () => {};
    try {
      httpSpy.and.returnValue(throwError(() => ({ error: { message: 'Server Failure' } })));
      spyOn(component.messageService, 'add');

      const events: MCEventModalForm[] = [];
      component.getEventObs().subscribe(ev => events.push(ev));

      component.onSendRequest({ title: 'BadRequest' });
      flush();

      expect(events.some(e => e.key === 'stop-loading')).toBeTrue();
      expect(component.messageService.add).toHaveBeenCalledWith(jasmine.objectContaining({
        severity: 'error',
        detail: 'Server Failure'
      }));
    } finally {
      rxjsConfig.onUnhandledError = prevHandler;
    }
  }));
});
