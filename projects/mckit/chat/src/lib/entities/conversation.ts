import { MCMessageChat } from "./message";
import { MCUserChat } from "./user";

export class MCConversation {
    id?: string;
    messages: MCMessageChat[] = [];
    user?: MCUserChat;
}