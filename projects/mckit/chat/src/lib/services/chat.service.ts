import { Injectable, Type } from '@angular/core';
import { MCBaseMessageComponent } from '../messages/base-message.component';
import { MCMessageChatType } from '../entities/message';
import { MCMessageTextComponent } from '../messages/text/text.component';
import { MCMessageImageComponent } from '../messages/image/image.component';
import { MCMessageVideoComponent } from '../messages/video/video.component';
import { MCMessageAudioComponent } from '../messages/audio/audio.component';
import { MCMessageFileComponent } from '../messages/file/file.component';
import { MCChatEmptyComponent } from '../../public-api';

@Injectable({
  providedIn: 'root'
})
export class MCChatService {

  private registry = new Map<string, Type<MCBaseMessageComponent>>();

  constructor() {
    this.register(MCMessageChatType.TEXT, MCMessageTextComponent);
    this.register(MCMessageChatType.IMAGE, MCMessageImageComponent);
    this.register(MCMessageChatType.VIDEO, MCMessageVideoComponent);
    this.register(MCMessageChatType.AUDIO, MCMessageAudioComponent);
    this.register(MCMessageChatType.FILE, MCMessageFileComponent);
    this.register(MCMessageChatType.EMPTY, MCChatEmptyComponent);
  }

  register(type: string, component: Type<MCBaseMessageComponent>) {
    this.registry.set(type, component);
  }

  getComponent(type: string): Type<MCBaseMessageComponent> | undefined {
    return this.registry.get(type);
  }
}
