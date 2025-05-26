import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IftaTextConditionalFieldComponent } from './ifta-text-conditional-field.component';

describe('IftaTextConditionalFieldComponent', () => {
  let component: IftaTextConditionalFieldComponent;
  let fixture: ComponentFixture<IftaTextConditionalFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IftaTextConditionalFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IftaTextConditionalFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
