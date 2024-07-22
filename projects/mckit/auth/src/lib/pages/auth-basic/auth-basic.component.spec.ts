import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCAuthBasicComponent } from './auth-basic.component';

describe('AuthBasicComponent', () => {
  let component: MCAuthBasicComponent;
  let fixture: ComponentFixture<MCAuthBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCAuthBasicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCAuthBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
