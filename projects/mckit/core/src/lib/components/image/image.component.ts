import { Component } from '@angular/core';
import { MCCoreComponent } from '../mc-core-component';
import { MCComponent } from '../../entities/mc-component';

@Component({
    selector: 'mc-image',
    imports: [],
    templateUrl: './image.component.html',
    styleUrl: './image.component.scss'
})
export class ImageComponent extends MCCoreComponent {
}

export class MCImage extends MCComponent {
  constructor(
    url: string,
    width?: number,
  ) {
    super(ImageComponent);
    this.config = {
      url: url,
      width: width
    };
  }
}
