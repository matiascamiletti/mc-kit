import { Subject } from 'rxjs';
import { mcEventFormOperator, mcSavedEventFormOperator } from './mc-event-form-modal-operator';
import { MCEventModalForm } from '../entities/mc-event-modal-form';

describe('mcEventFormModalOperator', () => {
  it('should call callback only when event key matches in mcEventFormOperator', () => {
    const subject = new Subject<MCEventModalForm>();
    const received: MCEventModalForm[] = [];

    subject.pipe(
      mcEventFormOperator('custom-event', (event) => received.push(event))
    ).subscribe();

    subject.next({ key: 'other-event', content: 1 });
    expect(received.length).toBe(0);

    const matchingEvent: MCEventModalForm = { key: 'custom-event', content: { id: 10 } };
    subject.next(matchingEvent);
    expect(received.length).toBe(1);
    expect(received[0]).toBe(matchingEvent);
  });

  it('should call onSaved callback when event key is saved in mcSavedEventFormOperator', () => {
    const subject = new Subject<MCEventModalForm>();
    let savedCalled = false;

    subject.pipe(
      mcSavedEventFormOperator(() => {
        savedCalled = true;
      })
    ).subscribe();

    subject.next({ key: 'submit', content: {} });
    expect(savedCalled).toBeFalse();

    subject.next({ key: 'saved', content: { id: 1 } });
    expect(savedCalled).toBeTrue();
  });
});
