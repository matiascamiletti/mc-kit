import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCFormModal } from './form-modal.component';

describe('MCFormModal', () => {
  let component: MCFormModal;
  let fixture: ComponentFixture<MCFormModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCFormModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCFormModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
