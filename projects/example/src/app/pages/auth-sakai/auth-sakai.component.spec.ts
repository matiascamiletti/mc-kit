import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSakaiComponent } from './auth-sakai.component';

describe('AuthSakaiComponent', () => {
  let component: AuthSakaiComponent;
  let fixture: ComponentFixture<AuthSakaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSakaiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSakaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
