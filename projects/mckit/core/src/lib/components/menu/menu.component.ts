import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MCCoreComponent } from '../mc-core-component';
import { MCComponent } from '../../entities/mc-component';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';

// TODO: Complete the implementation
@Component({
    selector: 'mc-menu',
    imports: [CommonModule, RouterModule, RippleModule],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss'
})
export class MenuComponent extends MCCoreComponent {

  onClickItem(item: MCItemMenu) {

  }
}

export class MCMenu extends MCComponent {
  constructor(
    items: Array<MCItemMenu>
  ) {
    super(MenuComponent);
    this.config = {
      items: items
    };
  }
}

export class MCItemMenu {
  label: string = '';
  icon?: string;
  link?: string;
  externalLink?: string;
  event?: string;
  children?: Array<MCItemMenu>;
}
