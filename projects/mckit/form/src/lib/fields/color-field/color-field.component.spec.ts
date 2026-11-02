import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ColorField, ColorFieldComponent } from './color-field.component';

describe('ColorFieldComponent', () => {
  let component: ColorFieldComponent;
  let fixture: ComponentFixture<ColorFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorFieldComponent],
      providers: [provideNoopAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorFieldComponent);
    component = fixture.componentInstance;

    const field = ColorField.init('themeColor', {
      label: 'Theme Color',
      default_value: '#336699'
    });
    const control = new UntypedFormControl('#336699');
    const group = new UntypedFormGroup({ themeColor: control });

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('control', control);
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
  });

  it('should create and display color value', () => {
    expect(component).toBeTruthy();
    expect(component.field().config.label).toBe('Theme Color');
    expect(fixture.nativeElement.textContent).toContain('#336699');
  });
});
