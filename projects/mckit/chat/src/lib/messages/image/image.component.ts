import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { MCBaseMessageComponent } from '../base-message.component';

@Component({
  selector: 'mc-message-image',
  imports: [CommonModule, ImageModule],
  templateUrl: './image.component.html',
  styleUrl: './image.component.css'
})
export class MCMessageImageComponent extends MCBaseMessageComponent {

}
