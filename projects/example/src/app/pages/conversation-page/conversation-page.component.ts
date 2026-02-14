import { Component, inject, OnInit, signal } from '@angular/core';
import { MCChatService, MCConversation, MCConversationComponent, MCHistoryConversationComponent, MCMessageChatSide, MCMessageChatType } from '../../../../../mckit/chat/src/public-api';
import { MCEventChat, MCEventChatType } from '../../../../../mckit/chat/src/lib/entities/event';

@Component({
  selector: 'app-conversation-page',
  imports: [MCConversationComponent, MCHistoryConversationComponent],
  templateUrl: './conversation-page.component.html',
  styleUrl: './conversation-page.component.scss'
})
export class ConversationPage implements OnInit {

  chatService = inject(MCChatService);

  conversation = signal<MCConversation | undefined>(undefined);

  conversations = signal<MCConversation[]>([]);

  ngOnInit(): void {
    this.loadConversations();
    this.conversation.set({
      id: '1',
      user: {
        id: '1',
        firstname: 'Matias',
        lastname: 'Camiletti',
        photo: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
        online: true
      },
      messages: [
        {
          id: 0,
          type: MCMessageChatType.EMPTY,
          content: '',
          createdAt: new Date().toISOString(),
          side: MCMessageChatSide.LEFT,
        },
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
        } as any,
        {
          id: '2',
          type: MCMessageChatType.IMAGE,
          content: 'data:image/png;base64,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',
          createdAt: new Date().toISOString(),
          side: MCMessageChatSide.LEFT,
        } as any,
        {
          id: '3',
          type: MCMessageChatType.VIDEO,
          content: 'https://www.w3schools.com/html/mov_bbb.mp4',
          createdAt: new Date().toISOString(),
          side: MCMessageChatSide.LEFT,
        } as any,
        {
          id: '4',
          type: MCMessageChatType.AUDIO,
          content: 'https://www.w3schools.com/html/mov_bbb.mp4',
          createdAt: new Date().toISOString(),
          side: MCMessageChatSide.LEFT,
        } as any,
        {
          id: '5',
          type: MCMessageChatType.FILE,
          content: 'https://www.w3schools.com/html/mov_bbb.mp4',
          createdAt: new Date().toISOString(),
          side: MCMessageChatSide.LEFT,
        } as any,
        {
          id: '6',
          type: MCMessageChatType.THINKING,
          content: '',
          createdAt: new Date().toISOString(),
          side: MCMessageChatSide.LEFT,
        } as any,
      ]
    });
    this.loadChat();
  }

  loadChat() {
    this.chatService.onEvent()
      .subscribe(this.onChatEvent.bind(this));
  }

  onChatEvent(event: MCEventChat) {
    if (event.type === MCEventChatType.SEND_MESSAGE) {

      let conversation = this.conversation()!;

      conversation.messages.push({
        id: Date.now().toString(),
        type: MCMessageChatType.TEXT,
        content: event.data,
        createdAt: new Date().toISOString(),
        side: MCMessageChatSide.RIGHT,
      });

      this.conversation.set(conversation);
    }
  }

  loadConversations() {
    this.conversations.set([
      {
        id: '1',
        title: 'Conversation 1',
        messages: [
          {
            id: '1',
            type: MCMessageChatType.TEXT,
            content: 'Hello',
            createdAt: new Date().toISOString(),
            side: MCMessageChatSide.LEFT,
          },
          {
            id: '2',
            type: MCMessageChatType.TEXT,
            content: 'Hi',
            createdAt: new Date().toISOString(),
            side: MCMessageChatSide.RIGHT,
          },
        ],
        user: {
          id: '1',
          firstname: 'John',
          lastname: 'Doe',
          online: true,
        },
      },
      {
        id: '2',
        title: 'Conversation 2',
        messages: [
          {
            id: '1',
            type: MCMessageChatType.TEXT,
            content: 'Hello',
            createdAt: new Date().toISOString(),
            side: MCMessageChatSide.LEFT,
          },
          {
            id: '2',
            type: MCMessageChatType.TEXT,
            content: 'Hi',
            createdAt: new Date().toISOString(),
            side: MCMessageChatSide.RIGHT,
          },
        ],
        user: {
          id: '2',
          firstname: 'Jane',
          lastname: 'Doe',
          online: false,
        },
      },
    ]);
  }
}
