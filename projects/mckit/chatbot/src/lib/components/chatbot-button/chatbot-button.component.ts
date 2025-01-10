import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MCChatbotPanelComponent } from '../chatbot-panel/chatbot-panel.component';
import { MCChatbotConfig } from '../../entities/chatbot-config';
import { MCChatbotMessage } from '../../entities/chatbot-message';

@Component({
  selector: 'mc-chatbot-button',
  standalone: true,
  imports: [CommonModule, ButtonModule, OverlayPanelModule, MCChatbotPanelComponent],
  templateUrl: './chatbot-button.component.html',
  styleUrl: './chatbot-button.component.scss'
})
export class MCChatbotButtonComponent {
  config = input.required<MCChatbotConfig>();
  messages = input<Array<MCChatbotMessage>>();

  send = output<MCChatbotMessage>();
  open = output();

  loading = signal<boolean>(false);

  isFirstOpen = false;

  onToggle() {
    if(this.isFirstOpen == false){
      this.open.emit();
      this.isFirstOpen = true;
    }
  }

  onSend(message: MCChatbotMessage) {
    this.send.emit(message);
  }

  showLoading() {
    this.loading.set(true);
  }

  hideLoading() {
    this.loading.set(false);
  }
}
