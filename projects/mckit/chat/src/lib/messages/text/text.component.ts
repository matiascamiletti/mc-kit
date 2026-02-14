import { Component } from '@angular/core';
import { MCBaseMessageComponent } from '../base-message.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-message-text',
  imports: [CommonModule],
  templateUrl: './text.component.html',
  styleUrl: './text.component.css'
})
export class MCMessageTextComponent extends MCBaseMessageComponent {

}
