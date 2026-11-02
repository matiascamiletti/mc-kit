import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { TagsField, TagsFieldComponent } from './tags-field.component';

describe('TagsFieldComponent', () => {
  let component: TagsFieldComponent;
  let fixture: ComponentFixture<TagsFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagsFieldComponent],
      providers: [provideNoopAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagsFieldComponent);
    component = fixture.componentInstance;

    const field = TagsField.init('keywords');
    const control = new UntypedFormControl(['angular', 'testing']);
    const group = new UntypedFormGroup({ keywords: control });

    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('control', control);
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
  });

  it('should create and bind TagsField', () => {
    expect(component).toBeTruthy();
    expect(component.field().key).toBe('keywords');
  });
});
