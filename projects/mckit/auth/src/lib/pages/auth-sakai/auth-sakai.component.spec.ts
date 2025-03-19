import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCAuthSakaiComponent } from './auth-sakai.component';

describe('AuthSakaiComponent', () => {
  let component: MCAuthSakaiComponent;
  let fixture: ComponentFixture<MCAuthSakaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCAuthSakaiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCAuthSakaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
