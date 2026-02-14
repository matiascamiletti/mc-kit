import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MCBaseMessageComponent } from '../base-message.component';

@Component({
  selector: 'mc-message-audio',
  imports: [CommonModule],
  templateUrl: './audio.component.html',
  styleUrl: './audio.component.css'
})
export class MCMessageAudioComponent extends MCBaseMessageComponent {

}
