import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MCBaseMessageComponent } from '../base-message.component';

@Component({
  selector: 'mc-chat-empty',
  imports: [CommonModule],
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.css'
})
export class MCChatEmptyComponent extends MCBaseMessageComponent {

}
