import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayIftaTextFieldComponent } from './array-ifta-text-field.component';

describe('ArrayIftaTextFieldComponent', () => {
  let component: ArrayIftaTextFieldComponent;
  let fixture: ComponentFixture<ArrayIftaTextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrayIftaTextFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrayIftaTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
