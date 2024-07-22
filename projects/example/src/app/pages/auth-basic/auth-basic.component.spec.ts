import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthBasicComponent } from './auth-basic.component';

describe('AuthBasicComponent', () => {
  let component: AuthBasicComponent;
  let fixture: ComponentFixture<AuthBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthBasicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
