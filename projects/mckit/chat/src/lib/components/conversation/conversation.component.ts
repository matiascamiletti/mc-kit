import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MCMessageChat, MCMessageChatSide, MCMessageChatType } from '../../entities/message';
import { MCChatService } from '../../services/chat.service';
import { MCBaseMessageComponent } from '../../messages/base-message.component';

@Component({
  selector: 'mc-conversation',
  imports: [CommonModule, FormsModule, AvatarModule, ButtonModule, InputTextModule],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css'
})
export class MCConversationComponent implements OnInit {

  chatService = inject(MCChatService);

  messages: MCMessageChat[] = [];
  newMessage: string = '';

  ngOnInit(): void {
    // Dummy data for visualization
    this.messages = [
      {
        id: '1',
        type: MCMessageChatType.TEXT,
        content: 'Hello! How can I help you?',
        createdAt: new Date().toISOString(),
        side: MCMessageChatSide.LEFT,
        // sentByMe: false // assuming we might need this property, adding strictly to the class later if needed, for now I'll handle "me" vs "them" by some logic or just assumed property if I can modify the entity.
        // Wait, looking at MCMessageChat entity, it doesn't have a sender field. 
        // I should probably add one to the entity or extend it locally for the UI.
        // For now let's assume I check a 'senderId' or something.
        // Let's modify the entity first or just add a 'sender' property for now to the object literals and see if TS complains (it will).
        // I will add a sender 'me' or 'other' for this demo.
      } as any
    ];

    // Better yet, let's update the entity to have a sender or owner since checking the file `message.ts` it was very basic. 
    // actually, I'll stick to the existing entity for now and maybe just use an extra property in the component.
  }

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
    this.messages.push(message);
    this.newMessage = '';
  }
}
