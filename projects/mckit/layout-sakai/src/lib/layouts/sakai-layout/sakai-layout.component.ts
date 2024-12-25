import { CommonModule } from '@angular/common';
import { afterNextRender, Component, inject, OnInit, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrintServiceComponent } from '@mckit/core';
import { ID_FOOTER_MC_COMPONENT, ID_SIDEBAR_MC_COMPONENT, ID_TOPBAR_MC_COMPONENT, MCSidebarService } from '@mckit/layout-core';

@Component({
  selector: 'mc-sakai-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, PrintServiceComponent],
  templateUrl: './sakai-layout.component.html',
  styleUrl: './sakai-layout.component.scss'
})
export class MCSakaiLayoutComponent {

  sidebarService = inject(MCSidebarService);

  topbarLeftId = ID_TOPBAR_MC_COMPONENT + '_left';
  topbarRightId = ID_TOPBAR_MC_COMPONENT + '_right';

  sidebarId = ID_SIDEBAR_MC_COMPONENT;

  footerId = ID_FOOTER_MC_COMPONENT;

  isOpen: WritableSignal<boolean> = this.sidebarService.isOpen;

  constructor() {
    afterNextRender(() => {
      this.initSidebar();
    });
  }

  initSidebar() {
    if(this.verifyIfMobile()) {
      this.sidebarService.isOpen.update(() => false);
    }
  }

  verifyIfMobile() {
    return window.innerWidth < 768;
  }

  closeSidebar() {
    if(this.verifyIfMobile()) {
      this.sidebarService.isOpen.update(() => false);
    }
  }
}
