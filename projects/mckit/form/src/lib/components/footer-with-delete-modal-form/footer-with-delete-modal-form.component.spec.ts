import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCFooterWithDeleteModalForm } from './footer-with-delete-modal-form.component';

describe('MCFooterWithDeleteModalForm', () => {
  let component: MCFooterWithDeleteModalForm;
  let fixture: ComponentFixture<MCFooterWithDeleteModalForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCFooterWithDeleteModalForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCFooterWithDeleteModalForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
