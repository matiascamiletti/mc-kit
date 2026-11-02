import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { HiddenField, HiddenFieldComponent } from './hidden-field.component';

describe('HiddenFieldComponent', () => {
  let component: HiddenFieldComponent;
  let fixture: ComponentFixture<HiddenFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HiddenFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiddenFieldComponent);
    component = fixture.componentInstance;

    const field = HiddenField.init('id', 100);
    const control = new UntypedFormControl(100);
    const group = new UntypedFormGroup({ id: control });

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('control', control);
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
  });

  it('should create and configure HiddenField with default value', () => {
    expect(component).toBeTruthy();
    expect(component.field().key).toBe('id');
    expect(component.field().config.default_value).toBe(100);
  });
});
