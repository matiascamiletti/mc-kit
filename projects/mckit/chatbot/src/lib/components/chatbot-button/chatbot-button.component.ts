import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MCChatbotPanelComponent } from '../chatbot-panel/chatbot-panel.component';

@Component({
  selector: 'mc-chatbot-button',
  standalone: true,
  imports: [CommonModule, ButtonModule, OverlayPanelModule, MCChatbotPanelComponent],
  templateUrl: './chatbot-button.component.html',
  styleUrl: './chatbot-button.component.scss'
})
export class MCChatbotButtonComponent {

}
