import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { IftaTextareaField, IftaTextareaFieldComponent } from './ifta-textarea-field.component';

describe('IftaTextareaFieldComponent', () => {
  let component: IftaTextareaFieldComponent;
  let fixture: ComponentFixture<IftaTextareaFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IftaTextareaFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IftaTextareaFieldComponent);
    component = fixture.componentInstance;

    const field = IftaTextareaField.init('description', 'Description', {
      default_value: 'Initial bio'
    });
    const control = new UntypedFormControl('Initial bio');
    const group = new UntypedFormGroup({ description: control });

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('control', control);
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
  });

  it('should create and render textarea label', () => {
    expect(component).toBeTruthy();
    expect(component.field().config.label).toBe('Description');
    expect(fixture.nativeElement.textContent).toContain('Description');
  });
});
