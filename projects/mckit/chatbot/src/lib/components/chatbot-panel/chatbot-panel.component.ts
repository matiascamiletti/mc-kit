import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'mc-chatbot-panel',
  standalone: true,
  imports: [CommonModule, AvatarModule, InputTextModule, ButtonModule],
  templateUrl: './chatbot-panel.component.html',
  styleUrl: './chatbot-panel.component.css'
})
export class MCChatbotPanelComponent {

}
