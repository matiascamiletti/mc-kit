export enum MCEventChatType {
    TYPING = 'typing',
    SEND_MESSAGE = 'send_message'
}

export class MCEventChat {
    type!: MCEventChatType | string;
    data?: any;
}