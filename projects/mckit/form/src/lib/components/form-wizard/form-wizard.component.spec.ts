import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCFormWizard } from './form-wizard.component';

describe('MCFormWizard', () => {
  let component: MCFormWizard;
  let fixture: ComponentFixture<MCFormWizard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCFormWizard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCFormWizard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
