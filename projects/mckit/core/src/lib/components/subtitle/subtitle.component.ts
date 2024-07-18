import { Component, Input } from '@angular/core';
import { MCCoreComponent } from '../mc-core-component';
import { MCComponent } from '../../entities/mc-component';

@Component({
  selector: 'mc-subtitle',
  standalone: true,
  imports: [],
  templateUrl: './subtitle.component.html',
  styleUrl: './subtitle.component.css'
})
export class SubtitleComponent extends MCCoreComponent {
}

export class MCSubtitle extends MCComponent {
  constructor(
    text: string
  ) {
    super(SubtitleComponent);
    this.config = {
      text: text
    };
  }
}
