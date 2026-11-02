import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCThinkingComponent } from './thinking.component';
import { MCMessageChatSide, MCMessageChatType } from '../../entities/message';

describe('MCThinkingComponent', () => {
  let component: MCThinkingComponent;
  let fixture: ComponentFixture<MCThinkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCThinkingComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MCThinkingComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('message', {
      type: MCMessageChatType.THINKING,
      side: MCMessageChatSide.LEFT
    });
    fixture.detectChanges();
  });

  it('should create and render bouncing dots', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('.animate-bounce').length).toBe(3);
  });
});
