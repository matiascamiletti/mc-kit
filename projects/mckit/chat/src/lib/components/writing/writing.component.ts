import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MCChatService } from '../../services/chat.service';
import { MCEventChatType } from '../../entities/event';

@Component({
  selector: 'mc-writing-conversation',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './writing.component.html',
  styleUrl: './writing.component.css'
})
export class MCWritingComponent {

  input = new FormControl<string>('', { nonNullable: true });

  chatService = inject(MCChatService);

  onClickSend() {
    if (!this.input.value.trim()) return;

    this.chatService.sendEvent({
      type: MCEventChatType.SEND_MESSAGE,
      data: this.input.value
    });

    this.input.reset();
  }
}
