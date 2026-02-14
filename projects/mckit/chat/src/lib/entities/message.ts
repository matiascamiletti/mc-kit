export enum MCMessageChatType {
    TEXT = 'text',
    IMAGE = 'image',
    VIDEO = 'video',
    AUDIO = 'audio',
    FILE = 'file',
    EMPTY = 'empty',
    THINKING = 'thinking'
}

export enum MCMessageChatSide {
    LEFT = 'left',
    RIGHT = 'right'
}

export class MCMessageChat {
    id?: string | number;
    type!: string;
    side!: MCMessageChatSide;
    content?: any;
    createdAt?: string;
}