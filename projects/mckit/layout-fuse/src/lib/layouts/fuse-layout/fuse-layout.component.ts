import { CommonModule } from '@angular/common';
import { afterNextRender, Component, inject, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrintServiceComponent } from '@mckit/core';
import { ID_SIDEBAR_MC_COMPONENT, ID_TOPBAR_MC_COMPONENT, MCSidebarService } from '@mckit/layout-core';

@Component({
  selector: 'mc-fuse-layout',
  imports: [CommonModule, RouterModule, PrintServiceComponent],
  templateUrl: './fuse-layout.component.html',
  styleUrl: './fuse-layout.component.scss'
})
export class MCFuseLayoutComponent {

  sidebarService: MCSidebarService = inject(MCSidebarService);

  sidebarId = ID_SIDEBAR_MC_COMPONENT;
  topbarLeftId = ID_TOPBAR_MC_COMPONENT + '_left';
  topbarRightId = ID_TOPBAR_MC_COMPONENT + '_right';

  isOpen = this.sidebarService.isOpen;

  constructor() {
    afterNextRender(() => this.initSidebar());
  }

  initSidebar() {
    if(this.verifyIfMobile()) {
      this.sidebarService.isOpen.set(false);
    }
  }

  verifyIfMobile() {
    return window.innerWidth < 768;
  }
}
