import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCSpinnerFullScreenComponent } from './spinner-full-screen.component';

describe('SpinnerFullScreenComponent', () => {
  let component: MCSpinnerFullScreenComponent;
  let fixture: ComponentFixture<MCSpinnerFullScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCSpinnerFullScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCSpinnerFullScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
