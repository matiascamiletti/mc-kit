import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DialogService, DynamicDialog, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { MCFooterWithDeleteModalForm } from './footer-with-delete-modal-form.component';
import { MCFormModal } from '../form-modal/form-modal.component';
import { MCEventModalForm } from '../../entities/mc-event-modal-form';

describe('MCFooterWithDeleteModalForm', () => {
  let component: MCFooterWithDeleteModalForm;
  let fixture: ComponentFixture<MCFooterWithDeleteModalForm>;
  let dialogServiceSpy: jasmine.SpyObj<DialogService>;
  let dialogRefMock: { close: jasmine.Spy; onChildComponentLoaded: Subject<MCFormModal> };
  let eventSubject: Subject<MCEventModalForm>;

  beforeEach(async () => {
    eventSubject = new Subject<MCEventModalForm>();
    const formGroupSignal = signal<UntypedFormGroup | undefined>(
      new UntypedFormGroup({ id: new UntypedFormControl(42) })
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
      imports: [MCFooterWithDeleteModalForm],
      providers: [
        { provide: DialogService, useValue: dialogServiceSpy },
        { provide: DynamicDialogRef, useValue: dialogRefMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCFooterWithDeleteModalForm);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dialogRefMock.onChildComponentLoaded.next({
      formComponent: () => ({ formGroup: formGroupSignal }),
      getEventObs: () => eventSubject
    } as unknown as MCFormModal);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit delete event with group value on onClickDelete', () => {
    const events: MCEventModalForm[] = [];
    eventSubject.subscribe(e => events.push(e));

    component.onClickDelete();
    expect(events.length).toBe(1);
    expect(events[0].key).toBe('delete');
    expect(events[0].content).toEqual({ id: 42 });
  });
});
