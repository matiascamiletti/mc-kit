import { MonoTypeOperatorFunction, tap } from 'rxjs';
import { MCEventModalForm } from '../components/form-modal/form-modal.component';

export function mcEventFormOperator(
  eventKey: string,
  onEvent: (event: MCEventModalForm) => void
): MonoTypeOperatorFunction<MCEventModalForm> {
  return tap((event: MCEventModalForm) => {
    if (event.key === eventKey) {
      onEvent(event);
    }
  });
}

export function mcSavedEventFormOperator(
  onSaved: () => void
): MonoTypeOperatorFunction<MCEventModalForm> {
  return mcEventFormOperator('saved', onSaved);
}