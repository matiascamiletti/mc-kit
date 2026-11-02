import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { of } from 'rxjs';
import { MCBaseFormModal } from './mc-base-form-modal';
import { MCBaseHttpFormModal } from './mc-base-http-form-modal';
import { MCBaseHttpModelFormModal } from './mc-base-http-model-form-modal';
import { MCApiRestHttpService } from '../services/api-rest-http.service';

interface TestEntity {
  id?: number;
  title?: string;
}

class ConcreteFormModal extends MCBaseFormModal {
  initForm(): void {
    this.formGroup = new FormGroup({
      title: new FormControl('hello')
    });
  }
  submit(): void {}
}

@Component({
  selector: 'test-http-form-modal',
  standalone: true,
  template: ''
})
class ConcreteHttpFormModal extends MCBaseHttpFormModal<TestEntity> {
  override initForm(): void {
    this.formGroup = new FormGroup({
      id: new FormControl<number | null>(null),
      title: new FormControl('', Validators.required)
    });
  }
}

@Component({
  selector: 'test-http-model-form-modal',
  standalone: true,
  template: ''
})
class ConcreteHttpModelFormModal extends MCBaseHttpModelFormModal<TestEntity> {}

describe('Core Form Modals', () => {
  describe('MCBaseFormModal', () => {
    it('should manage sending state, close, and cleanForm', () => {
      const modal = new ConcreteFormModal();
      modal.visible = true;
      modal.initForm();

      modal.sending();
      expect(modal.isSending).toBeTrue();
      expect(modal.formGroup?.disabled).toBeTrue();

      modal.cleanForm();
      expect(modal.isSending).toBeFalse();
      expect(modal.formGroup?.enabled).toBeTrue();

      modal.close();
      expect(modal.visible).toBeFalse();
    });
  });

  describe('MCBaseHttpFormModal', () => {
    let fixture: ComponentFixture<ConcreteHttpFormModal>;
    let component: ConcreteHttpFormModal;
    let mockDialogService: jasmine.SpyObj<DialogService>;
    let mockDialogRef: jasmine.SpyObj<DynamicDialogRef>;
    let mockHttpService: jasmine.SpyObj<MCApiRestHttpService<TestEntity>>;

    beforeEach(async () => {
      mockDialogService = jasmine.createSpyObj<DialogService>('DialogService', ['getInstance']);
      mockDialogRef = jasmine.createSpyObj<DynamicDialogRef>('DynamicDialogRef', ['close']);
      mockHttpService = jasmine.createSpyObj<MCApiRestHttpService<TestEntity>>('MCApiRestHttpService', ['create', 'update']);

      mockDialogService.getInstance.and.returnValue({ data: { id: 5, title: 'Existing' } } as any);
      mockHttpService.create.and.returnValue(of({ id: 1, title: 'Created' }));
      mockHttpService.update.and.returnValue(of({ id: 5, title: 'Updated' }));

      await TestBed.configureTestingModule({
        imports: [ConcreteHttpFormModal],
        providers: [
          { provide: DialogService, useValue: mockDialogService },
          { provide: DynamicDialogRef, useValue: mockDialogRef }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(ConcreteHttpFormModal);
      component = fixture.componentInstance;
      component.httpService = mockHttpService;
      fixture.detectChanges();
    });

    it('should initialize form and patch dialog data on init', () => {
      expect(component.formGroup?.value).toEqual({ id: 5, title: 'Existing' });
    });

    it('should call update when item has id and close dialog', () => {
      component.formGroup?.patchValue({ id: 5, title: 'Updated' });
      component.submit();

      expect(mockHttpService.update).toHaveBeenCalledWith({ id: 5, title: 'Updated' });
      expect(mockDialogRef.close).toHaveBeenCalledWith({ id: 5, title: 'Updated' });
    });

    it('should call create when item has no id and close dialog', () => {
      component.formGroup?.patchValue({ id: null, title: 'Created' });
      component.submit();

      expect(mockHttpService.create).toHaveBeenCalledWith({ id: null, title: 'Created' } as any);
      expect(mockDialogRef.close).toHaveBeenCalledWith({ id: 1, title: 'Created' });
    });

    it('should not submit when form is invalid and should close on onClose()', () => {
      component.formGroup?.patchValue({ id: null, title: '' });
      component.submit();
      expect(mockHttpService.create).not.toHaveBeenCalled();

      component.onClose();
      expect(mockDialogRef.close).toHaveBeenCalled();
    });
  });

  describe('MCBaseHttpModelFormModal', () => {
    let fixture: ComponentFixture<ConcreteHttpModelFormModal>;
    let component: ConcreteHttpModelFormModal;
    let mockDialogService: jasmine.SpyObj<DialogService>;
    let mockDialogRef: jasmine.SpyObj<DynamicDialogRef>;
    let mockHttpService: jasmine.SpyObj<MCApiRestHttpService<TestEntity>>;

    beforeEach(async () => {
      mockDialogService = jasmine.createSpyObj<DialogService>('DialogService', ['getInstance']);
      mockDialogRef = jasmine.createSpyObj<DynamicDialogRef>('DynamicDialogRef', ['close']);
      mockHttpService = jasmine.createSpyObj<MCApiRestHttpService<TestEntity>>('MCApiRestHttpService', ['create', 'update']);

      mockDialogService.getInstance.and.returnValue({ data: { title: 'Draft' } } as any);
      mockHttpService.create.and.returnValue(of({ id: 2, title: 'Draft' }));
      mockHttpService.update.and.returnValue(of({ id: 2, title: 'Saved' }));

      await TestBed.configureTestingModule({
        imports: [ConcreteHttpModelFormModal],
        providers: [
          { provide: DialogService, useValue: mockDialogService },
          { provide: DynamicDialogRef, useValue: mockDialogRef }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(ConcreteHttpModelFormModal);
      component = fixture.componentInstance;
      component.httpService = mockHttpService;
      fixture.detectChanges();
    });

    it('should load item from dialog data and call create or update on submit', () => {
      expect(component.item).toEqual({ title: 'Draft' });

      component.submit();
      expect(mockHttpService.create).toHaveBeenCalledWith({ title: 'Draft' });
      expect(mockDialogRef.close).toHaveBeenCalledWith({ id: 2, title: 'Draft' });

      component.setItem({ id: 2, title: 'Saved' });
      component.submit();
      expect(mockHttpService.update).toHaveBeenCalledWith({ id: 2, title: 'Saved' });

      component.onClose();
      expect(mockDialogRef.close).toHaveBeenCalled();
    });
  });
});
