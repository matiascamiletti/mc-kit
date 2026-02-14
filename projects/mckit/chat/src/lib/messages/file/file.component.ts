import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MCBaseMessageComponent } from '../base-message.component';

@Component({
  selector: 'mc-message-file',
  imports: [CommonModule],
  templateUrl: './file.component.html',
  styleUrl: './file.component.css'
})
export class MCMessageFileComponent extends MCBaseMessageComponent {

}
