import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCTableComponent } from './table.component';

describe('MCTableComponent', () => {
  let component: MCTableComponent;
  let fixture: ComponentFixture<MCTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
