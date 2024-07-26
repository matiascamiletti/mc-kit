import { Component, inject } from '@angular/core';
import { MCComponent, MCCoreComponent } from '@mckit/core';
import { ButtonModule } from 'primeng/button';
import { MCSidebarService } from '../../services/sidebar.service';


@Component({
  selector: 'mc-icon-toggle-sidebar-button',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './icon-toggle-sidebar-button.component.html',
  styleUrl: './icon-toggle-sidebar-button.component.css'
})
export class IconToggleSidebarButtonComponent extends MCCoreComponent {

  sidebarService: MCSidebarService = inject(MCSidebarService);

  onClick() {
    this.sidebarService.isOpen.update((res) => !res);
  }
}

export class MCIconToggleSidebarButton extends MCComponent {
  constructor() {
    super(IconToggleSidebarButtonComponent);
  }
}
