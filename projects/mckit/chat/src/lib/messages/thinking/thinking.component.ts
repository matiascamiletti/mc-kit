import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MCBaseMessageComponent } from '../base-message.component';

@Component({
  selector: 'mc-chat-thinking',
  imports: [CommonModule],
  templateUrl: './thinking.component.html',
  styleUrl: './thinking.component.css'
})
export class MCThinkingComponent extends MCBaseMessageComponent {

}
