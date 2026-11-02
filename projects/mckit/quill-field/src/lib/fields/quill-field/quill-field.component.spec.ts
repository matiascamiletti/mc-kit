import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { QuillField, QuillFieldComponent } from './quill-field.component';

describe('QuillFieldComponent', () => {
  let component: QuillFieldComponent;
  let fixture: ComponentFixture<QuillFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuillFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuillFieldComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('field', QuillField.init('description', { height: 320 }));
    fixture.componentRef.setInput('control', new UntypedFormControl('<p>Initial</p>'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize field config with default and custom height via QuillField.init', () => {
    const defaultField = QuillField.init('body');
    expect(defaultField.key).toBe('body');
    expect(defaultField.component).toBe(QuillFieldComponent);
    expect(defaultField.config.height).toBe(250);

    const customField = QuillField.init('notes', { height: 400 });
    expect(customField.config.height).toBe(400);
  });
});
