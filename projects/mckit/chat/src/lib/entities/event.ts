export enum MCEventChatType {
    TYPING = 'typing',
    SEND_MESSAGE = 'send_message',
    NEW_CHAT = 'new_chat',
    CLICK_CHAT = 'click_chat'
}

export class MCEventChat {
    type!: MCEventChatType | string;
    data?: any;
}