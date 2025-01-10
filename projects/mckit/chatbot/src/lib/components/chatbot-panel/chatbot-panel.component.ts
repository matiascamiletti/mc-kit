import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MCChatbotConfig } from '../../entities/chatbot-config';
import { MCChatbotMessage, MCChatbotMessageType } from '../../entities/chatbot-message';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'mc-chatbot-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AvatarModule, InputTextModule, ButtonModule],
  templateUrl: './chatbot-panel.component.html',
  styleUrl: './chatbot-panel.component.css'
})
export class MCChatbotPanelComponent {
  config = input.required<MCChatbotConfig>();
  send = output<MCChatbotMessage>();

  inputMessage = new FormControl();

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
