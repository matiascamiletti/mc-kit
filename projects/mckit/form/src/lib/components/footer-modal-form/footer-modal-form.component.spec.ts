import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCFooterModalForm } from './footer-modal-form.component';

describe('MCFooterModalForm', () => {
  let component: MCFooterModalForm;
  let fixture: ComponentFixture<MCFooterModalForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCFooterModalForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCFooterModalForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
