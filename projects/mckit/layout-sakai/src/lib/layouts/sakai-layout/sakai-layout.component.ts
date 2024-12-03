import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrintServiceComponent } from '@mckit/core';
import { ID_TOPBAR_MC_COMPONENT, MCSidebarService } from '@mckit/layout-core';

@Component({
  selector: 'mc-sakai-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, PrintServiceComponent],
  templateUrl: './sakai-layout.component.html',
  styleUrl: './sakai-layout.component.scss'
})
export class MCSakaiLayoutComponent implements OnInit {

  sidebarService = inject(MCSidebarService);

  topbarLeftId = ID_TOPBAR_MC_COMPONENT + '_left';
  topbarRightId = ID_TOPBAR_MC_COMPONENT + '_right';

  isOpen?: WritableSignal<boolean>;

  ngOnInit(): void {
    this.isOpen = this.sidebarService.isOpen;
  }
}
