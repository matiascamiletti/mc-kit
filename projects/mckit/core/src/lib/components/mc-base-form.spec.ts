import { FormControl, FormGroup } from '@angular/forms';
import { throwError } from 'rxjs';
import { MCBaseForm } from './mc-base-form';
import { MCBaseModelForm } from './mc-base-model-form';

class ConcreteForm extends MCBaseForm {
  initForm(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('initial')
    });
  }
  submit(): void {}
}

class ConcreteModelForm extends MCBaseModelForm<{ id?: number; name: string }> {
  submit(): void {}
}

describe('MCBaseForm and MCBaseModelForm', () => {
  describe('MCBaseForm', () => {
    let form: ConcreteForm;

    beforeEach(() => {
      form = new ConcreteForm();
      form.initForm();
    });

    it('should disable form and set isSending on sending()', () => {
      form.sending();
      expect(form.isSending).toBeTrue();
      expect(form.formGroup?.disabled).toBeTrue();
    });

    it('should enable form and clear isSending on stopSending()', () => {
      form.sending();
      form.stopSending();
      expect(form.isSending).toBeFalse();
      expect(form.formGroup?.enabled).toBeTrue();
    });

    it('should reset form and stop sending on cleanForm()', () => {
      form.formGroup?.get('name')?.setValue('modified');
      form.sending();
      form.cleanForm();
      expect(form.isSending).toBeFalse();
      expect(form.formGroup?.get('name')?.value).toBeNull();
    });

    it('should handle error messages and catchFormError()', () => {
      const obs$ = throwError(() => ({ error: { message: 'Validation failed' } })).pipe(
        form.catchFormError()
      );

      form.sending();
      obs$.subscribe({
        error: () => {
          expect(form.isSending).toBeFalse();
          expect(form.messages).toEqual([{ severity: 'error', text: 'Validation failed' }]);
        }
      });

      form.cleanMessages();
      expect(form.messages).toEqual([]);
    });
  });

  describe('MCBaseModelForm', () => {
    let modelForm: ConcreteModelForm;

    beforeEach(() => {
      modelForm = new ConcreteModelForm();
      modelForm.copyItem = { id: 1, name: 'Original' };
      modelForm.item = { id: 1, name: 'Changed' };
    });

    it('should toggle isSending and restore copyItem on cleanForm()', () => {
      modelForm.sending();
      expect(modelForm.isSending).toBeTrue();

      modelForm.cleanForm();
      expect(modelForm.isSending).toBeFalse();
      expect(modelForm.item).toEqual({ id: 1, name: 'Original' });
    });

    it('should add and clean error messages via catchFormError()', () => {
      const obs$ = throwError(() => ({ error: {}, message: 'Server error' })).pipe(
        modelForm.catchFormError()
      );

      modelForm.sending();
      obs$.subscribe({
        error: () => {
          expect(modelForm.isSending).toBeFalse();
          expect(modelForm.messages).toEqual([{ severity: 'error', text: 'Server error' }]);
        }
      });

      modelForm.cleanMessages();
      expect(modelForm.messages).toEqual([]);
    });
  });
});
