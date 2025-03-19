import { CommonModule } from '@angular/common';
import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mc-split-page',
  imports: [CommonModule],
  templateUrl: './split-page.component.html',
  styleUrl: './split-page.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class MCSplitPageComponent {
  leftImage = input<string>();
  leftTitle = input<string>();
  leftSubtitle = input<string>();

  rightTitle = input<string>();
  rightSubtitle = input<string>();
  rightText = input<string>();
}
