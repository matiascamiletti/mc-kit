import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MCConversation } from '../../entities/conversation';
import { MCChatService } from '../../services/chat.service';
import { MCEventChatType } from '../../entities/event';

@Component({
  selector: 'mc-history-conversation',
  imports: [CommonModule, AvatarModule, ButtonModule],
  templateUrl: './history-conversation.component.html',
  styleUrl: './history-conversation.component.css'
})
export class MCHistoryConversationComponent {
  conversations = input<MCConversation[]>([]);

  chatService = inject(MCChatService);

  getInitials(conversation: MCConversation): string {
    if (conversation.user) {
      const initials = ((conversation.user.firstname?.charAt(0) ?? '') + (conversation.user.lastname?.charAt(0) ?? '')).toUpperCase();
      return initials ? initials : 'U';
    }
    return 'C';
  }

  getTitle(conversation: MCConversation): string {
    if (conversation.title) return conversation.title;
    if (conversation.user) return `${conversation.user.firstname} ${conversation.user.lastname}`.trim();
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
