import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCMessageVideoComponent } from './video.component';
import { MCMessageChatSide, MCMessageChatType } from '../../entities/message';

describe('MCMessageVideoComponent', () => {
  let component: MCMessageVideoComponent;
  let fixture: ComponentFixture<MCMessageVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCMessageVideoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MCMessageVideoComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('message', {
      id: '1',
      type: MCMessageChatType.VIDEO,
      side: MCMessageChatSide.LEFT,
      content: 'https://example.com/clip.mp4',
      createdAt: new Date().toISOString()
    });
    fixture.detectChanges();
  });

  it('should create and render video element', () => {
    expect(component).toBeTruthy();
    const video = fixture.nativeElement.querySelector('video');
    expect(video).toBeTruthy();
    expect(video.getAttribute('src')).toBe('https://example.com/clip.mp4');
  });
});
