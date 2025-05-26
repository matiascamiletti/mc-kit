import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IftaTextareaFieldComponent } from './ifta-textarea-field.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
