import { CommonModule } from '@angular/common';
import { afterNextRender, Component, inject, OnInit, OnDestroy, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrintServiceComponent } from '@mckit/core';
import { ID_FOOTER_MC_COMPONENT, ID_SIDEBAR_MC_COMPONENT, ID_TOPBAR_MC_COMPONENT, MCSidebarService } from '@mckit/layout-core';

@Component({
    selector: 'mc-sakai-layout',
    imports: [CommonModule, RouterModule, PrintServiceComponent],
    templateUrl: './sakai-layout.component.html',
    styleUrl: './sakai-layout.component.scss'
})
export class MCSakaiLayoutComponent implements OnInit, OnDestroy {

  sidebarService: MCSidebarService = inject(MCSidebarService);

  topbarLeftId = ID_TOPBAR_MC_COMPONENT + '_left';
  topbarRightId = ID_TOPBAR_MC_COMPONENT + '_right';

  sidebarId = ID_SIDEBAR_MC_COMPONENT;

  footerId = ID_FOOTER_MC_COMPONENT;

  isOpen: WritableSignal<boolean> = this.sidebarService.isOpen;

  isDesktop = false;

  constructor() {
    afterNextRender(() => {
      this.initSidebar();
    });
  }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.isDesktop = window.innerWidth >= 768;
      window.addEventListener('resize', this.onResize);
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize);
    }
  }

  onResize = () => {
    this.isDesktop = window.innerWidth >= 768;
  };

  initSidebar() {
    if(!this.isDesktop) {
      this.sidebarService.isOpen.update(() => false);
    }
  }

  closeSidebar() {
    this.sidebarService.isOpen.update(() => false);
  }

  openSidebar() {
    this.sidebarService.isOpen.update(() => true);
  }
}
