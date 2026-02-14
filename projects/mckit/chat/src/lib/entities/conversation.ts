import { MCMessageChat } from "./message";

export class MCConversation {
    id?: string;
    messages: MCMessageChat[] = [];
}