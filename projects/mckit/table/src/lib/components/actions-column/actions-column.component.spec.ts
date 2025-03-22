import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCActionsColumn } from './actions-column.component';

describe('MCActionsColumn', () => {
  let component: MCActionsColumn;
  let fixture: ComponentFixture<MCActionsColumn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCActionsColumn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCActionsColumn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
