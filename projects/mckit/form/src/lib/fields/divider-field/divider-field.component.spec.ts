import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormGroup } from '@angular/forms';
import { DividerField, DividerFieldComponent } from './divider-field.component';

describe('DividerFieldComponent', () => {
  let component: DividerFieldComponent;
  let fixture: ComponentFixture<DividerFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DividerFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DividerFieldComponent);
    component = fixture.componentInstance;

    const field = DividerField.init('Section Header');
    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('group', new UntypedFormGroup({}));
    fixture.detectChanges();
  });

  it('should create and render divider label', () => {
    expect(component).toBeTruthy();
    expect(component.field().config.no_control).toBeTrue();
    expect(fixture.nativeElement.textContent).toContain('Section Header');
  });
});
