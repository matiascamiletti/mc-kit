import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotButtonComponent } from './chatbot-button.component';

describe('ChatbotButtonComponent', () => {
  let component: ChatbotButtonComponent;
  let fixture: ComponentFixture<ChatbotButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatbotButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatbotButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
