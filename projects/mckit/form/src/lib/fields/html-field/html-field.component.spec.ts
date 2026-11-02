import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormGroup } from '@angular/forms';
import { HtmlField, HtmlFieldComponent } from './html-field.component';

describe('HtmlFieldComponent', () => {
  let component: HtmlFieldComponent;
  let fixture: ComponentFixture<HtmlFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HtmlFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HtmlFieldComponent);
    component = fixture.componentInstance;

    const field = HtmlField.init('<span class="custom-html">Custom Content</span>');
    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('group', new UntypedFormGroup({}));
    fixture.detectChanges();
  });

  it('should create and render trusted HTML content', () => {
    expect(component).toBeTruthy();
    expect(component.field().config.no_control).toBeTrue();
    expect(fixture.nativeElement.querySelector('.custom-html')?.textContent).toBe('Custom Content');
  });
});
