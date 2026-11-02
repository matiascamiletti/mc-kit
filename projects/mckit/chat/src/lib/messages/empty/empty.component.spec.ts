import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCChatEmptyComponent } from './empty.component';
import { MCMessageChatSide, MCMessageChatType } from '../../entities/message';

describe('MCChatEmptyComponent', () => {
  let component: MCChatEmptyComponent;
  let fixture: ComponentFixture<MCChatEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCChatEmptyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MCChatEmptyComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('message', {
      type: MCMessageChatType.EMPTY,
      side: MCMessageChatSide.LEFT
    });
    fixture.detectChanges();
  });

  it('should create and display empty message', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('No messages yet');
  });
});
