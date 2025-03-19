import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MCComponent, MCCoreComponent } from '@mckit/core';
import { MCSidebarService, MCNavigationService } from '@mckit/layout-core';
import { ButtonModule } from 'primeng/button';


@Component({
    selector: 'mc-icon-toggle-sidebar-button',
    imports: [CommonModule, ButtonModule],
    templateUrl: './icon-toggle-sidebar-button.component.html',
    styleUrl: './icon-toggle-sidebar-button.component.css'
})
export class IconToggleSidebarButtonComponent extends MCCoreComponent {

  sidebarService: MCSidebarService = inject(MCSidebarService);
  navigationService: MCNavigationService = inject(MCNavigationService);

  isMainSection = this.navigationService.isMain;

  onClick() {
    this.sidebarService.isOpen.update((res) => !res);
  }

  onClickBack() {
    this.navigationService.onBack.next();
  }
}

export class MCIconToggleSidebarButton extends MCComponent {
  constructor() {
    super(IconToggleSidebarButtonComponent);
  }
}
