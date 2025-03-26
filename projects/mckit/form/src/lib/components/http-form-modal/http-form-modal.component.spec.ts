import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCHttpFormModal } from './http-form-modal.component';

describe('MCHttpFormModal', () => {
  let component: MCHttpFormModal;
  let fixture: ComponentFixture<MCHttpFormModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCHttpFormModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCHttpFormModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
