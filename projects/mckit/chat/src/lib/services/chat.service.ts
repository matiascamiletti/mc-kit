import { Injectable, Type } from '@angular/core';
import { MCBaseMessageComponent } from '../messages/base-message.component';
import { MCMessageChatType } from '../entities/message';
import { MCMessageTextComponent } from '../messages/text/text.component';

@Injectable({
  providedIn: 'root'
})
export class MCChatService {

  private registry = new Map<string, Type<MCBaseMessageComponent>>();

  constructor() {
    this.register(MCMessageChatType.TEXT, MCMessageTextComponent);
  }

  register(type: string, component: Type<MCBaseMessageComponent>) {
    this.registry.set(type, component);
  }

  getComponent(type: string): Type<MCBaseMessageComponent> | undefined {
    return this.registry.get(type);
  }
}
