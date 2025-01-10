export enum MCChatbotMessageType {
  USER,
  BOT
}

export class MCChatbotMessage {
  sender?: string;
  message: string = '';
  type: MCChatbotMessageType = MCChatbotMessageType.USER;
}
