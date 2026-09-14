import { Component } from '@angular/core';
import { MCCardRoundedComponent, MCPageTitleComponent } from '../../../../../mckit/layout-axis/src/public-api';

@Component({
  selector: 'app-axis-page',
  imports: [MCPageTitleComponent, MCCardRoundedComponent],
  templateUrl: './axis-page.component.html',
  styleUrl: './axis-page.component.scss',
})
export class AxisPageComponent {

}
