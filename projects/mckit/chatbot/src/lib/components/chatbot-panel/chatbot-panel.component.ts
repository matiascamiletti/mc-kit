import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MCChatbotConfig } from '../../entities/chatbot-config';
import { MCChatbotMessage, MCChatbotMessageType } from '../../entities/chatbot-message';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'mc-chatbot-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AvatarModule, InputTextModule, ButtonModule, ProgressBarModule],
  templateUrl: './chatbot-panel.component.html',
  styleUrl: './chatbot-panel.component.css'
})
export class MCChatbotPanelComponent {

  config = input.required<MCChatbotConfig>();
  loading = input<boolean>();
  messages = input<Array<MCChatbotMessage>>();

  send = output<MCChatbotMessage>();

  inputMessage = new FormControl();

  messageTypeUser = MCChatbotMessageType.USER;

  onClickSend() {
    if(this.inputMessage.value == '') {
      return;
    }

    const message = new MCChatbotMessage();
    message.sender = 'You';
    message.message = this.inputMessage.value;
    message.type = MCChatbotMessageType.USER;
    this.send.emit(message);

    this.inputMessage.setValue('');
  }
}
