import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ID_SIDEBAR_MC_COMPONENT } from '../../services/sidebar.service';
import { PrintServiceComponent } from '@mckit/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ID_TOPBAR_MC_COMPONENT } from '../../services/topbar.service';


@Component({
  selector: 'mc-basic-layout',
  standalone: true,
  imports: [RouterModule, PrintServiceComponent, ToolbarModule],
  templateUrl: './basic-layout.component.html',
  styleUrl: './basic-layout.component.scss',
})
export class BasicLayout {
  sidebarId = ID_SIDEBAR_MC_COMPONENT;
  topbarLeftId = ID_TOPBAR_MC_COMPONENT + '_left';
  topbarRightId = ID_TOPBAR_MC_COMPONENT + '_right';
  topbarCenterId = ID_TOPBAR_MC_COMPONENT + '_center';
}
