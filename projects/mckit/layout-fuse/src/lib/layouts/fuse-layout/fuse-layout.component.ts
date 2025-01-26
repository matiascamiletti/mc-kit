import { afterNextRender, Component, inject, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrintServiceComponent } from '@mckit/core';
import { ID_SIDEBAR_MC_COMPONENT, MCSidebarService } from '@mckit/layout-core';

@Component({
  selector: 'mc-fuse-layout',
  imports: [RouterModule, PrintServiceComponent],
  templateUrl: './fuse-layout.component.html',
  styleUrl: './fuse-layout.component.scss'
})
export class MCFuseLayoutComponent {

  sidebarService: MCSidebarService = inject(MCSidebarService);

  sidebarId = ID_SIDEBAR_MC_COMPONENT;

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
