import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MCHistoryConversationComponent } from './history-conversation.component';
import { MCHistoryFooterDirective } from '../../directives/history-footer.directive';
import { MCHistoryEmptyDirective } from '../../directives/history-empty.directive';
import { MCConversation } from '../../entities/conversation';
import { MCMessageChatSide, MCMessageChatType } from '../../entities/message';
import { MCChatService } from '../../services/chat.service';
import { MCEventChatType } from '../../entities/event';

@Component({
  selector: 'test-host-projected-footer',
  imports: [MCHistoryConversationComponent, MCHistoryFooterDirective],
  template: `
    <mc-history-conversation [conversations]="conversations">
      <div footer class="test-custom-footer">Custom Projected Footer Content</div>
    </mc-history-conversation>
  `
})
class TestHostProjectedFooterComponent {
  conversations: MCConversation[] = [
    {
      id: '1',
      title: 'Conversation 1',
      messages: [
        {
          id: '101',
          content: 'Hello there',
          type: MCMessageChatType.TEXT,
          side: MCMessageChatSide.LEFT,
          createdAt: new Date().toISOString()
        }
      ]
    },
    {
      id: '2',
      title: 'Conversation 2',
      messages: []
    }
  ];
}

@Component({
  selector: 'test-host-directive-footer',
  imports: [MCHistoryConversationComponent, MCHistoryFooterDirective, MCHistoryEmptyDirective],
  template: `
    <mc-history-conversation [conversations]="conversations">
      <div mcHistoryFooter class="test-directive-footer">Directive Footer Content</div>
      <ng-template mcHistoryEmpty>Empty</ng-template>
    </mc-history-conversation>
  `
})
class TestHostDirectiveFooterComponent {
  conversations: MCConversation[] = [
    {
      id: '1',
      title: 'Conversation 1',
      messages: []
    }
  ];
}

describe('MCHistoryConversationComponent', () => {
  let component: MCHistoryConversationComponent;
  let fixture: ComponentFixture<MCHistoryConversationComponent>;
  let chatService: MCChatService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MCHistoryConversationComponent,
        TestHostProjectedFooterComponent,
        TestHostDirectiveFooterComponent
      ]
    }).compileComponents();

    chatService = TestBed.inject(MCChatService);
    fixture = TestBed.createComponent(MCHistoryConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a scrollable container with overflow-y-auto', () => {
    const scrollEl = fixture.debugElement.query(By.css('.overflow-y-auto'));
    expect(scrollEl).toBeTruthy();
    expect(scrollEl.nativeElement.classList.contains('overflow-y-auto')).toBeTrue();
  });

  it('should project a custom footer via [footer]', () => {
    const hostFixture = TestBed.createComponent(TestHostProjectedFooterComponent);
    hostFixture.detectChanges();

    const footerEl = hostFixture.debugElement.query(By.css('.test-custom-footer'));
    expect(footerEl).toBeTruthy();
    expect(footerEl.nativeElement.textContent).toContain('Custom Projected Footer Content');
  });

  it('should render a custom footer via mcHistoryFooter directive', () => {
    const hostFixture = TestBed.createComponent(TestHostDirectiveFooterComponent);
    hostFixture.detectChanges();

    const footerEl = hostFixture.debugElement.query(By.css('.test-directive-footer'));
    expect(footerEl).toBeTruthy();
    expect(footerEl.nativeElement.textContent).toContain('Directive Footer Content');
  });

  it('should compute initials and titles and emit chat events', () => {
    expect(component.getInitials({ messages: [], user: { firstname: 'john', lastname: 'doe' } })).toBe('JD');
    expect(component.getInitials({ messages: [], user: {} })).toBe('U');
    expect(component.getInitials({ messages: [] })).toBe('C');

    expect(component.getTitle({ title: 'My Chat', messages: [] })).toBe('My Chat');
    expect(component.getTitle({ user: { firstname: 'Jane', lastname: 'Doe' }, messages: [] })).toBe('Jane Doe');
    expect(component.getTitle({ messages: [] })).toBe('Conversation');

    const sendSpy = spyOn(chatService, 'sendEvent');
    const conv: MCConversation = { id: 'c1', messages: [] };
    component.onSelect(conv);
    expect(sendSpy).toHaveBeenCalledWith({ type: MCEventChatType.CLICK_CHAT, data: conv });

    component.onNew();
    expect(sendSpy).toHaveBeenCalledWith({ type: MCEventChatType.NEW_CHAT, data: {} });
  });
});
