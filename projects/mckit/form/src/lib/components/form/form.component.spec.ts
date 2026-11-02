import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCForm } from './form.component';
import { MCConfigForm } from '../../entities/mc-config-form';
import { HiddenField } from '../../fields/hidden-field/hidden-field.component';
import { MCEventForm } from '../../entities/mc-event-form';

describe('MCForm', () => {
  let component: MCForm;
  let fixture: ComponentFixture<MCForm>;
  let config: MCConfigForm;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCForm);
    component = fixture.componentInstance;

    config = {
      fields: [HiddenField.init('name', 'DefaultName')],
      item: { name: 'InitialName' }
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
  });

  it('should create and initialize formGroup with item values', () => {
    expect(component).toBeTruthy();
    expect(component.getFormGroup()).toBeTruthy();
    expect(component.getValues()).toEqual({ name: 'InitialName' });
  });

  it('should update item and patch values', () => {
    component.updateItem({ name: 'UpdatedName' });
    expect(component.getValues()).toEqual({ name: 'UpdatedName' });

    component.patchValues({ name: 'PatchedName' });
    expect(component.getValues()).toEqual({ name: 'PatchedName' });
  });

  it('should handle patchValues and submit safely when formGroup is undefined', () => {
    component.formGroup.set(undefined);
    expect(() => component.patchValues({ name: 'Test' })).not.toThrow();
    expect(() => component.submit()).not.toThrow();
  });

  it('should emit submit event when submit is called or eventObs emits', () => {
    const emitted: MCEventForm[] = [];
    component.onEvent.subscribe(ev => emitted.push(ev));

    component.submit();
    expect(emitted.length).toBe(1);
    expect(emitted[0].key).toBe('submit');
    expect(emitted[0].content).toEqual({ name: 'InitialName' });

    component.getEventObs().next(MCEventForm.init('custom', 123));
    expect(emitted.length).toBe(2);
    expect(emitted[1].key).toBe('custom');
    expect(emitted[1].content).toBe(123);
  });
});
