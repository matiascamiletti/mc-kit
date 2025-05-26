import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCSearchField } from './search-field.component';

describe('MCSearchField', () => {
  let component: MCSearchField;
  let fixture: ComponentFixture<MCSearchField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCSearchField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCSearchField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
