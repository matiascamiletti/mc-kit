import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { StepButtonsField, StepButtonsFieldComponent } from './step-buttons-field.component';
import { MCEventForm } from '../../entities/mc-event-form';

describe('StepButtonsFieldComponent', () => {
  let component: StepButtonsFieldComponent;
  let fixture: ComponentFixture<StepButtonsFieldComponent>;
  let eventObs: Subject<MCEventForm>;
  let group: UntypedFormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepButtonsFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepButtonsFieldComponent);
    component = fixture.componentInstance;

    const field = StepButtonsField.init(1, 3);
    group = new UntypedFormGroup({
      stepVal: new UntypedFormControl('ok')
    });
    eventObs = new Subject<MCEventForm>();

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('group', group);
    fixture.componentRef.setInput('eventObs', eventObs);
    fixture.detectChanges();
  });

  it('should create and emit step-back, step-next, and submit events', () => {
    expect(component).toBeTruthy();
    const events: MCEventForm[] = [];
    eventObs.subscribe(e => events.push(e));

    component.onClickBack();
    expect(events[0].key).toBe('step-back');
    expect(events[0].content).toBe(1);

    component.onClickNext();
    expect(events[1].key).toBe('step-next');
    expect(events[1].content).toBe(1);

    component.onClickFinal();
    expect(component.isLoading()).toBeTrue();
    expect(events[2].key).toBe('submit');
    expect(events[2].content).toEqual({ stepVal: 'ok' });

    eventObs.next(MCEventForm.init('stop-loading'));
    expect(component.isLoading()).toBeFalse();
  });
});
