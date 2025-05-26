import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenModalFieldComponent } from './open-modal-field.component';

describe('OpenModalFieldComponent', () => {
  let component: OpenModalFieldComponent;
  let fixture: ComponentFixture<OpenModalFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenModalFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenModalFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
