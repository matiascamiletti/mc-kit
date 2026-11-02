import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { PrintFieldComponent } from './print-field.component';
import { HiddenField } from '../../fields/hidden-field/hidden-field.component';
import { MCEventForm } from '../../entities/mc-event-form';

describe('PrintFieldComponent', () => {
  let component: PrintFieldComponent;
  let fixture: ComponentFixture<PrintFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintFieldComponent);
    component = fixture.componentInstance;

    const field = HiddenField.init('id', 10);
    const control = new UntypedFormControl(10);
    const group = new UntypedFormGroup({ id: control });
    const eventObs = new Subject<MCEventForm>();

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('control', control);
    fixture.componentRef.setInput('group', group);
    fixture.componentRef.setInput('eventObs', eventObs);
    fixture.detectChanges();
  });

  it('should create and dynamically instantiate field component', () => {
    expect(component).toBeTruthy();
  });
});
