import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCLayoutAI } from './layout-ai.component';

describe('MCLayoutAI', () => {
  let component: MCLayoutAI;
  let fixture: ComponentFixture<MCLayoutAI>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCLayoutAI]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MCLayoutAI);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
