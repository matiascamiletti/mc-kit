import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCFilterButton } from './filter-button.component';

describe('FilterButtonComponent', () => {
  let component: MCFilterButton;
  let fixture: ComponentFixture<MCFilterButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCFilterButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCFilterButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
