import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IftaTextFieldComponent } from './ifta-text-field.component';

describe('IftaTextFieldComponent', () => {
  let component: IftaTextFieldComponent;
  let fixture: ComponentFixture<IftaTextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IftaTextFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IftaTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
