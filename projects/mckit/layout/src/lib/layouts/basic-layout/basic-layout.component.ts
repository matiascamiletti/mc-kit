import { Component, HostListener, OnInit, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ID_SIDEBAR_MC_COMPONENT, MCSidebarService } from '../../services/sidebar.service';
import { PrintServiceComponent } from '@mckit/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ID_TOPBAR_MC_COMPONENT } from '../../services/topbar.service';

declare const window: any;

@Component({
  selector: 'mc-basic-layout',
  standalone: true,
  imports: [RouterModule, PrintServiceComponent, ToolbarModule],
  templateUrl: './basic-layout.component.html',
  styleUrl: './basic-layout.component.scss',
})
export class BasicLayout implements OnInit {
  sidebarId = ID_SIDEBAR_MC_COMPONENT;
  topbarLeftId = ID_TOPBAR_MC_COMPONENT + '_left';
  topbarRightId = ID_TOPBAR_MC_COMPONENT + '_right';
  topbarCenterId = ID_TOPBAR_MC_COMPONENT + '_center';

  isOpen?: WritableSignal<boolean>;

  constructor(
    protected sidebarService: MCSidebarService,
  ) {}

  ngOnInit(): void {
    this.isOpen = this.sidebarService.isOpen;
    this.configResize();
  }

  configResize() {
    if (window.innerWidth < 768) {
      this.isOpen?.set(false);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.configResize();
  }
}
