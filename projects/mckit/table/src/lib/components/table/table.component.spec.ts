import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCTable } from './table.component';

describe('MCTable', () => {
  let component: MCTable;
  let fixture: ComponentFixture<MCTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
