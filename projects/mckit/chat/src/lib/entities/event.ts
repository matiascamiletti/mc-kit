export enum MCEventChatType {
    TYPING = 'typing',
}

export class MCEventChat {
    type!: MCEventChatType | string;
    data?: any;
}