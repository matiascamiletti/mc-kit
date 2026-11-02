import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MCMessageImageComponent } from './image.component';
import { MCMessageChatSide, MCMessageChatType } from '../../entities/message';

describe('MCMessageImageComponent', () => {
  let component: MCMessageImageComponent;
  let fixture: ComponentFixture<MCMessageImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCMessageImageComponent],
      providers: [provideNoopAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(MCMessageImageComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('message', {
      id: '1',
      type: MCMessageChatType.IMAGE,
      side: MCMessageChatSide.LEFT,
      content: 'https://example.com/pic.png',
      createdAt: new Date().toISOString()
    });
    fixture.detectChanges();
  });

  it('should create and render p-image', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('p-image')).toBeTruthy();
  });
});
