import { TestBed } from '@angular/core/testing';
import { MCChatService } from './chat.service';
import { MCMessageChatType } from '../entities/message';
import { MCMessageTextComponent } from '../messages/text/text.component';
import { MCMessageImageComponent } from '../messages/image/image.component';
import { MCMessageVideoComponent } from '../messages/video/video.component';
import { MCMessageAudioComponent } from '../messages/audio/audio.component';
import { MCMessageFileComponent } from '../messages/file/file.component';
import { MCChatEmptyComponent } from '../messages/empty/empty.component';
import { MCThinkingComponent } from '../messages/thinking/thinking.component';
import { MCEventChatType } from '../entities/event';

describe('MCChatService', () => {
  let service: MCChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MCChatService);
  });

  it('should be created and have default message components registered', () => {
    expect(service).toBeTruthy();
    expect(service.getComponent(MCMessageChatType.TEXT)).toBe(MCMessageTextComponent);
    expect(service.getComponent(MCMessageChatType.IMAGE)).toBe(MCMessageImageComponent);
    expect(service.getComponent(MCMessageChatType.VIDEO)).toBe(MCMessageVideoComponent);
    expect(service.getComponent(MCMessageChatType.AUDIO)).toBe(MCMessageAudioComponent);
    expect(service.getComponent(MCMessageChatType.FILE)).toBe(MCMessageFileComponent);
    expect(service.getComponent(MCMessageChatType.EMPTY)).toBe(MCChatEmptyComponent);
    expect(service.getComponent(MCMessageChatType.THINKING)).toBe(MCThinkingComponent);
    expect(service.getComponent('unknown')).toBeUndefined();
  });

  it('should allow registering custom component and emitting events', (done) => {
    service.register('custom', MCMessageTextComponent);
    expect(service.getComponent('custom')).toBe(MCMessageTextComponent);

    service.onEvent().subscribe((ev) => {
      expect(ev.type).toBe(MCEventChatType.TYPING);
      expect(ev.data).toEqual({ userId: 1 });
      done();
    });

    service.sendEvent({ type: MCEventChatType.TYPING, data: { userId: 1 } });
  });
});
