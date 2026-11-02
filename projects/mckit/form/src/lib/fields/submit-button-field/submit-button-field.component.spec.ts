import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { SubmitButtonField, SubmitButtonFieldComponent } from './submit-button-field.component';
import { MCEventForm } from '../../entities/mc-event-form';

describe('SubmitButtonFieldComponent', () => {
  let component: SubmitButtonFieldComponent;
  let fixture: ComponentFixture<SubmitButtonFieldComponent>;
  let eventObs: Subject<MCEventForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitButtonFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitButtonFieldComponent);
    component = fixture.componentInstance;

    const field = SubmitButtonField.init('save-btn', 'Save Changes', { icon: 'pi pi-save' });
    const group = new UntypedFormGroup({
      name: new UntypedFormControl('Test')
    });
    eventObs = new Subject<MCEventForm>();

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('group', group);
    fixture.componentRef.setInput('eventObs', eventObs);
    fixture.detectChanges();
  });

  it('should create, emit event on click, and stop loading on stop-loading event', () => {
    expect(component).toBeTruthy();
    const events: MCEventForm[] = [];
    eventObs.subscribe(e => events.push(e));

    component.onClick();
    expect(component.isLoading()).toBeTrue();
    expect(events.length).toBe(1);
    expect(events[0].key).toBe('save-btn');
    expect(events[0].content).toEqual({ name: 'Test' });

    eventObs.next(MCEventForm.init('stop-loading'));
    expect(component.isLoading()).toBeFalse();
  });
});
