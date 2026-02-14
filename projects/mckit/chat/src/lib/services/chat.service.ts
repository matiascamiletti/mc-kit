import { Injectable, Type } from '@angular/core';
import { MCBaseMessageComponent } from '../messages/base-message.component';
import { MCMessageChatType } from '../entities/message';
import { MCMessageTextComponent } from '../messages/text/text.component';
import { MCMessageImageComponent } from '../messages/image/image.component';
import { MCMessageVideoComponent } from '../messages/video/video.component';
import { MCMessageAudioComponent } from '../messages/audio/audio.component';
import { MCMessageFileComponent } from '../messages/file/file.component';
import { Subject } from 'rxjs';
import { MCEventChat } from '../entities/event';
import { MCChatEmptyComponent } from '../messages/empty/empty.component';
import { MCThinkingComponent } from '../messages/thinking/thinking.component';

@Injectable({
  providedIn: 'root'
})
export class MCChatService {

  private registry = new Map<string, Type<MCBaseMessageComponent>>();

  private eventSubject = new Subject<MCEventChat>();

  constructor() {
    this.register(MCMessageChatType.TEXT, MCMessageTextComponent);
    this.register(MCMessageChatType.IMAGE, MCMessageImageComponent);
    this.register(MCMessageChatType.VIDEO, MCMessageVideoComponent);
    this.register(MCMessageChatType.AUDIO, MCMessageAudioComponent);
    this.register(MCMessageChatType.FILE, MCMessageFileComponent);
    this.register(MCMessageChatType.EMPTY, MCChatEmptyComponent);
    this.register(MCMessageChatType.THINKING, MCThinkingComponent);
  }

  register(type: string, component: Type<MCBaseMessageComponent>) {
    this.registry.set(type, component);
  }

  getComponent(type: string): Type<MCBaseMessageComponent> | undefined {
    return this.registry.get(type);
  }

  sendEvent(event: MCEventChat) {
    this.eventSubject.next(event);
  }

  onEvent() {
    return this.eventSubject.asObservable();
  }
}
