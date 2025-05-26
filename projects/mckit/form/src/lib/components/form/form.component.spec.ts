import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCForm } from './form.component';

describe('MCForm', () => {
  let component: MCForm;
  let fixture: ComponentFixture<MCForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
