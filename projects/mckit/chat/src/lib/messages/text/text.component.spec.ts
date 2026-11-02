import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCMessageTextComponent } from './text.component';
import { MCMessageChatSide, MCMessageChatType } from '../../entities/message';

describe('MCMessageTextComponent', () => {
  let component: MCMessageTextComponent;
  let fixture: ComponentFixture<MCMessageTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCMessageTextComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MCMessageTextComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('message', {
      id: '1',
      type: MCMessageChatType.TEXT,
      side: MCMessageChatSide.RIGHT,
      content: 'Hello from unit test',
      createdAt: new Date().toISOString()
    });
    fixture.detectChanges();
  });

  it('should create and display message text', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Hello from unit test');
  });
});
