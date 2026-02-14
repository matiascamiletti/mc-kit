import { CommonModule } from '@angular/common';
import { Component, inject, input, Type } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { MCMessageChat, MCMessageChatSide, MCMessageChatType } from '../../entities/message';
import { MCChatService } from '../../services/chat.service';
import { MCBaseMessageComponent } from '../../messages/base-message.component';
import { MCConversation } from '../../entities/conversation';
import { MCWritingComponent } from '../writing/writing.component';

@Component({
  selector: 'mc-conversation',
  imports: [CommonModule, AvatarModule, MCWritingComponent],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css'
})
export class MCConversationComponent {

  conversation = input.required<MCConversation>();

  chatService = inject(MCChatService);

  newMessage: string = '';

  // Let's pretend we have a currentUserId = 1.
  currentUserId = 1;

  getComponent(type: string): Type<MCBaseMessageComponent> {
    return this.chatService.getComponent(type) ?? MCBaseMessageComponent;
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    const message: MCMessageChat = {
      id: Date.now().toString(),
      type: MCMessageChatType.TEXT,
      content: this.newMessage,
      createdAt: new Date().toISOString(),
      side: MCMessageChatSide.RIGHT,
    };

    // Ideally we would push to a service, but for now just local array
    this.conversation().messages.push(message);
    this.newMessage = '';
  }
}
