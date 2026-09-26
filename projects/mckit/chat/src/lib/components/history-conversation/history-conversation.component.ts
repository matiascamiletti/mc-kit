import { CommonModule } from '@angular/common';
import { Component, computed, contentChild, inject, input, output, signal, TemplateRef } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MCConversation } from '../../entities/conversation';
import { MCChatService } from '../../services/chat.service';
import { MCEventChatType } from '../../entities/event';
import { MCHistoryFooterDirective } from '../../directives/history-footer.directive';
import { MCHistoryEmptyDirective } from '../../directives/history-empty.directive';

@Component({
  selector: 'mc-history-conversation',
  imports: [
    CommonModule,
    AvatarModule,
    ButtonModule
  ],
  templateUrl: './history-conversation.component.html',
  styleUrl: './history-conversation.component.css'
})
export class MCHistoryConversationComponent {
  chatService = inject(MCChatService);

  // Core inputs
  title = input<string>('Chats');
  conversations = input<MCConversation[]>([]);
  disablePhoto = input<boolean>(false);
  disableContent = input<boolean>(false);
  disableNewButton = input<boolean>(false);

  // Sizing
  height = input<string | null>(null);
  maxHeight = input<string | null>(null);

  // Styling inputs
  styleClass = input<string>('');
  listStyleClass = input<string>('');
  footerStyleClass = input<string>('');

  // Messages
  emptyMessage = input<string>('No conversations yet');

  // Content children directives (via projection)
  footerDirective = contentChild(MCHistoryFooterDirective);
  emptyDirective = contentChild(MCHistoryEmptyDirective);

  getInitials(conversation: MCConversation): string {
    if (conversation.user) {
      const initials = ((conversation.user.firstname?.charAt(0) ?? '') + (conversation.user.lastname?.charAt(0) ?? '')).toUpperCase();
      return initials ? initials : 'U';
    }
    return 'C';
  }

  getTitle(conversation: MCConversation): string {
    if (conversation.title) return conversation.title;
    if (conversation.user) return `${conversation.user.firstname ?? ''} ${conversation.user.lastname ?? ''}`.trim();
    return 'Conversation';
  }

  onSelect(conversation: MCConversation) {
    this.chatService.sendEvent({
      type: MCEventChatType.CLICK_CHAT,
      data: conversation
    });
  }

  onNew() {
    this.chatService.sendEvent({
      type: MCEventChatType.NEW_CHAT,
      data: {}
    });
  }
}
