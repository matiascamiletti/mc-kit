import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'mc-split-page',
  imports: [CommonModule],
  templateUrl: './split-page.component.html',
  styleUrl: './split-page.component.css'
})
export class MCSplitPageComponent {
  leftImage = input<string>();
  leftTitle = input<string>();
  leftSubtitle = input<string>();

  rightTitle = input<string>();
  rightSubtitle = input<string>();
  rightText = input<string>();
}
