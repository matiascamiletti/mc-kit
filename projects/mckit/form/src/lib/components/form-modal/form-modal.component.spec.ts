import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService, DynamicDialog, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MCFormModal } from './form-modal.component';
import { HiddenField } from '../../fields/hidden-field/hidden-field.component';
import { MCConfigForm } from '../../entities/mc-config-form';
import { MCEventModalForm } from '../../entities/mc-event-modal-form';

describe('MCFormModal', () => {
  let component: MCFormModal;
  let fixture: ComponentFixture<MCFormModal>;
  let dialogServiceSpy: jasmine.SpyObj<DialogService>;
  let dialogRefSpy: jasmine.SpyObj<DynamicDialogRef>;
  let mockConfig: MCConfigForm;

  beforeEach(async () => {
    mockConfig = {
      fields: [HiddenField.init('title', 'DefaultTitle')],
      item: { title: 'LoadedTitle' }
    };

    dialogServiceSpy = jasmine.createSpyObj('DialogService', ['getInstance']);
    dialogRefSpy = jasmine.createSpyObj('DynamicDialogRef', ['close']);

    dialogServiceSpy.getInstance.and.returnValue({
      data: mockConfig
    } as unknown as DynamicDialog);

    await TestBed.configureTestingModule({
      imports: [MCFormModal],
      providers: [
        { provide: DialogService, useValue: dialogServiceSpy },
        { provide: DynamicDialogRef, useValue: dialogRefSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCFormModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and initialize formConfig from dialog instance data', () => {
    expect(component).toBeTruthy();
    expect(component.formConfig()).toBe(mockConfig);
    expect(component.getFormGroup()?.value).toEqual({ title: 'LoadedTitle' });
  });

  it('should emit event through formComponent eventObs', () => {
    const received: MCEventModalForm[] = [];
    component.getEventObs().subscribe(ev => received.push(ev));

    component.emitEvent({ key: 'test-event', content: 'abc' });
    expect(received.length).toBe(1);
    expect(received[0].key).toBe('test-event');
  });

  it('should close dialog if instance data is undefined', () => {
    dialogServiceSpy.getInstance.and.returnValue(undefined);
    component.initForm();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});
