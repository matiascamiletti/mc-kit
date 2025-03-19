import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCFormComponent } from './form.component';

describe('MCFormComponent', () => {
  let component: MCFormComponent;
  let fixture: ComponentFixture<MCFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
