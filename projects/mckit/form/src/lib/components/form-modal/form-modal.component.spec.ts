import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCFormModalComponent } from './form-modal.component';

describe('MCFormModalComponent', () => {
  let component: MCFormModalComponent;
  let fixture: ComponentFixture<MCFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCFormModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
