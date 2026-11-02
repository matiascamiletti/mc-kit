import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCMessageAudioComponent } from './audio.component';
import { MCMessageChatSide, MCMessageChatType } from '../../entities/message';

describe('MCMessageAudioComponent', () => {
  let component: MCMessageAudioComponent;
  let fixture: ComponentFixture<MCMessageAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCMessageAudioComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MCMessageAudioComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('message', {
      id: '1',
      type: MCMessageChatType.AUDIO,
      side: MCMessageChatSide.LEFT,
      content: 'https://example.com/audio.mp3',
      createdAt: new Date().toISOString()
    });
    fixture.detectChanges();
  });

  it('should create and render audio element', () => {
    expect(component).toBeTruthy();
    const audio = fixture.nativeElement.querySelector('audio');
    expect(audio).toBeTruthy();
    expect(audio.getAttribute('src')).toBe('https://example.com/audio.mp3');
  });
});
