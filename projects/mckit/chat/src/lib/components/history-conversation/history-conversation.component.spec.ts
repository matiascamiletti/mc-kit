import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MCHistoryConversationComponent } from './history-conversation.component';
import { MCHistoryFooterDirective } from '../../directives/history-footer.directive';
import { MCConversation } from '../../entities/conversation';
import { MCMessageChatSide, MCMessageChatType } from '../../entities/message';

@Component({
  imports: [MCHistoryConversationComponent, MCHistoryFooterDirective],
  template: `
    <mc-history-conversation [conversations]="conversations" [selectedId]="'1'">
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
  imports: [MCHistoryConversationComponent, MCHistoryFooterDirective],
  template: `
    <mc-history-conversation [conversations]="conversations">
      <ng-template mcHistoryFooter>
        <div class="test-directive-footer">Directive Footer Content</div>
      </ng-template>
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MCHistoryConversationComponent,
        TestHostProjectedFooterComponent,
        TestHostDirectiveFooterComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MCHistoryConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a scrollable container with overflow-y-auto and mc-history-scroll', () => {
    const scrollEl = fixture.debugElement.query(By.css('.mc-history-scroll'));
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
});
