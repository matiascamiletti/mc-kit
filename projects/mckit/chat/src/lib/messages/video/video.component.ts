import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MCBaseMessageComponent } from '../base-message.component';

@Component({
  selector: 'mc-message-video',
  imports: [CommonModule],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class MCMessageVideoComponent extends MCBaseMessageComponent {

}
