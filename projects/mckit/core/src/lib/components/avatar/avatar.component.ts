import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MCCoreComponent } from '../mc-core-component';
import { MCComponent } from '../../entities/mc-component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'mc-avatar',
    imports: [CommonModule, AvatarModule, AvatarGroupModule],
    templateUrl: './avatar.component.html',
    styleUrl: './avatar.component.css'
})
export class AvatarComponent extends MCCoreComponent {

}

export class MCAvatar extends MCComponent {
  constructor(config: {
    label?: string,
    image?: string,
    size?: 'large' | 'xlarge',
    shape?: 'circle' | 'square',
    class?: string,
  }) {
    super(AvatarComponent);
    this.config = {
      label: config.label,
      image: config.image,
      size: config.size ?? 'large',
      shape: config.shape ?? 'square',
      class: config.class ?? '',
    };
  }
}
