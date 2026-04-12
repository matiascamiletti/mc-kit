import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalFuncFieldComponent } from './conditional-func-field.component';

describe('ConditionalFuncFieldComponent', () => {
  let component: ConditionalFuncFieldComponent;
  let fixture: ComponentFixture<ConditionalFuncFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionalFuncFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionalFuncFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
