import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCWritingComponent } from './writing.component';
import { MCChatService } from '../../services/chat.service';
import { MCEventChatType } from '../../entities/event';

describe('MCWritingComponent', () => {
  let component: MCWritingComponent;
  let fixture: ComponentFixture<MCWritingComponent>;
  let chatService: MCChatService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCWritingComponent]
    }).compileComponents();

    chatService = TestBed.inject(MCChatService);
    fixture = TestBed.createComponent(MCWritingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit SEND_MESSAGE event and reset input when non-empty', () => {
    const sendSpy = spyOn(chatService, 'sendEvent');

    component.input.setValue('   ');
    component.onClickSend();
    expect(sendSpy).not.toHaveBeenCalled();

    component.input.setValue('Hello World');
    component.onClickSend();
    expect(sendSpy).toHaveBeenCalledWith({
      type: MCEventChatType.SEND_MESSAGE,
      data: 'Hello World'
    });
    expect(component.input.value).toBe('');
  });
});
