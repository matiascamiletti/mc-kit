import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DialogService, DynamicDialog, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { MCFooterModalForm } from './footer-modal-form.component';
import { MCFormModal } from '../form-modal/form-modal.component';
import { MCEventModalForm } from '../../entities/mc-event-modal-form';

describe('MCFooterModalForm', () => {
  let component: MCFooterModalForm;
  let fixture: ComponentFixture<MCFooterModalForm>;
  let dialogServiceSpy: jasmine.SpyObj<DialogService>;
  let dialogRefMock: { close: jasmine.Spy; onChildComponentLoaded: Subject<MCFormModal> };
  let eventSubject: Subject<MCEventModalForm>;
  let formGroupSignal: ReturnType<typeof signal<UntypedFormGroup | undefined>>;

  beforeEach(async () => {
    eventSubject = new Subject<MCEventModalForm>();
    formGroupSignal = signal<UntypedFormGroup | undefined>(
      new UntypedFormGroup({ name: new UntypedFormControl('Alice') })
    );

    dialogServiceSpy = jasmine.createSpyObj('DialogService', ['getInstance']);
    dialogServiceSpy.getInstance.and.returnValue({
      data: { fields: [] }
    } as unknown as DynamicDialog);

    dialogRefMock = {
      close: jasmine.createSpy('close'),
      onChildComponentLoaded: new Subject<MCFormModal>()
    };

    await TestBed.configureTestingModule({
      imports: [MCFooterModalForm],
      providers: [
        { provide: DialogService, useValue: dialogServiceSpy },
        { provide: DynamicDialogRef, useValue: dialogRefMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCFooterModalForm);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dialogRefMock.onChildComponentLoaded.next({
      formComponent: () => ({ formGroup: formGroupSignal }),
      getEventObs: () => eventSubject
    } as unknown as MCFormModal);
    fixture.detectChanges();
  });

  it('should create and bind group and eventObs from child component', () => {
    expect(component).toBeTruthy();
    expect(component.group).toBe(formGroupSignal);
    expect(component.eventObs).toBe(eventSubject);
  });

  it('should emit close event and close dialog on cancel click', () => {
    const events: MCEventModalForm[] = [];
    eventSubject.subscribe(e => events.push(e));

    component.onClickCancel();
    expect(events.length).toBe(1);
    expect(events[0].key).toBe('close');
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should emit submit event with group value and handle stop-loading event', () => {
    const events: MCEventModalForm[] = [];
    eventSubject.subscribe(e => events.push(e));

    component.onClickSubmit();
    expect(component.isLoading()).toBeTrue();
    expect(events.length).toBe(1);
    expect(events[0].key).toBe('submit');
    expect(events[0].content).toEqual({ name: 'Alice' });

    eventSubject.next({ key: 'stop-loading', content: null });
    expect(component.isLoading()).toBeFalse();
  });

  it('should close dialog if instance data is undefined', () => {
    dialogServiceSpy.getInstance.and.returnValue(undefined);
    component.initConfig();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });
});
