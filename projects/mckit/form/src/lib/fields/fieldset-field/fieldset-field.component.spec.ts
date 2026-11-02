import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { FieldsetField, FieldsetFieldComponent } from './fieldset-field.component';
import { HiddenField } from '../hidden-field/hidden-field.component';

describe('FieldsetFieldComponent', () => {
  let component: FieldsetFieldComponent;
  let fixture: ComponentFixture<FieldsetFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldsetFieldComponent],
      providers: [provideNoopAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldsetFieldComponent);
    component = fixture.componentInstance;

    const field = FieldsetField.init('Personal Info', [HiddenField.init('firstName')], { classes: 'my-fieldset' });
    const group = new UntypedFormGroup({
      firstName: new UntypedFormControl('Jane')
    });

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
  });

  it('should create and render fieldset legend', () => {
    expect(component).toBeTruthy();
    expect(component.field().config.label).toBe('Personal Info');
    expect(fixture.nativeElement.textContent).toContain('Personal Info');
  });
});
