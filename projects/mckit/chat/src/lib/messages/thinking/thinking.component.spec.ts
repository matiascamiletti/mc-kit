import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCThinkingComponent } from './thinking.component';

describe('MCThinkingComponent', () => {
  let component: MCThinkingComponent;
  let fixture: ComponentFixture<MCThinkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCThinkingComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MCThinkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
