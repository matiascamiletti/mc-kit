import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCHistoryConversationComponent } from './history-conversation.component';

describe('MCHistoryConversationComponent', () => {
  let component: MCHistoryConversationComponent;
  let fixture: ComponentFixture<MCHistoryConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCHistoryConversationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MCHistoryConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
