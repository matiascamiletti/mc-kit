import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthHalfComponent } from './auth-half.component';

describe('AuthHalfComponent', () => {
  let component: AuthHalfComponent;
  let fixture: ComponentFixture<AuthHalfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthHalfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthHalfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
