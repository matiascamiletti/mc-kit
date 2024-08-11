import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCTwoColumnItemComponent } from './two-column-item.component';

describe('TwoColumnItemComponent', () => {
  let component: MCTwoColumnItemComponent;
  let fixture: ComponentFixture<MCTwoColumnItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCTwoColumnItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCTwoColumnItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
