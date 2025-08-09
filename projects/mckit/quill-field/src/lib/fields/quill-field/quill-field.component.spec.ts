import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuillFieldComponent } from './quill-field.component';

describe('QuillFieldComponent', () => {
  let component: QuillFieldComponent;
  let fixture: ComponentFixture<QuillFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuillFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuillFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
