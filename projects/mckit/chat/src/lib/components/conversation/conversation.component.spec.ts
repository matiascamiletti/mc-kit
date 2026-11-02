import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCConversationComponent } from './conversation.component';
import { MCConversation } from '../../entities/conversation';
import { MCMessageChatSide, MCMessageChatType } from '../../entities/message';
import { MCMessageTextComponent } from '../../messages/text/text.component';
import { MCBaseMessageComponent } from '../../messages/base-message.component';

describe('MCConversationComponent', () => {
  let component: MCConversationComponent;
  let fixture: ComponentFixture<MCConversationComponent>;
  let mockConversation: MCConversation;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCConversationComponent]
    }).compileComponents();

    mockConversation = {
      id: 'conv-1',
      title: 'Support Chat',
      user: { id: 'u1', firstname: 'Alice', lastname: 'Smith', online: true },
      messages: [
        {
          id: 'm1',
          type: MCMessageChatType.TEXT,
          side: MCMessageChatSide.LEFT,
          content: 'Hello!'
        }
      ]
    };

    fixture = TestBed.createComponent(MCConversationComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('conversation', mockConversation);
    fixture.detectChanges();
  });

  it('should create and resolve message components', () => {
    expect(component).toBeTruthy();
    expect(component.getComponent(MCMessageChatType.TEXT)).toBe(MCMessageTextComponent);
    expect(component.getComponent('unregistered-type')).toBe(MCBaseMessageComponent);
  });

  it('should append message on sendMessage and ignore empty messages', () => {
    component.newMessage = '   ';
    component.sendMessage();
    expect(mockConversation.messages.length).toBe(1);

    component.newMessage = 'How can I help?';
    component.sendMessage();
    expect(mockConversation.messages.length).toBe(2);
    expect(mockConversation.messages[1].content).toBe('How can I help?');
    expect(mockConversation.messages[1].side).toBe(MCMessageChatSide.RIGHT);
    expect(component.newMessage).toBe('');
  });
});
