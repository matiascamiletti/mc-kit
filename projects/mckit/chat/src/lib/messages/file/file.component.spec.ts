import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCMessageFileComponent } from './file.component';
import { MCMessageChatSide, MCMessageChatType } from '../../entities/message';

describe('MCMessageFileComponent', () => {
  let component: MCMessageFileComponent;
  let fixture: ComponentFixture<MCMessageFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCMessageFileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MCMessageFileComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('message', {
      id: '1',
      type: MCMessageChatType.FILE,
      side: MCMessageChatSide.RIGHT,
      content: 'https://example.com/report.pdf',
      createdAt: new Date().toISOString()
    });
    fixture.detectChanges();
  });

  it('should create and render download link', () => {
    expect(component).toBeTruthy();
    const link = fixture.nativeElement.querySelector('a');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('https://example.com/report.pdf');
  });
});
