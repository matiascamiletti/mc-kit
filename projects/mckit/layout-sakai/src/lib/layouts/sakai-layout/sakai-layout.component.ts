import { CommonModule } from '@angular/common';
import { Component, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrintServiceComponent } from '@mckit/core';
import { ID_TOPBAR_MC_COMPONENT } from '@mckit/layout-core';

@Component({
  selector: 'mc-sakai-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, PrintServiceComponent],
  templateUrl: './sakai-layout.component.html',
  styleUrl: './sakai-layout.component.scss'
})
export class MCSakaiLayoutComponent {

  topbarLeftId = ID_TOPBAR_MC_COMPONENT + '_left';
  topbarRightId = ID_TOPBAR_MC_COMPONENT + '_right';

  isOpen?: WritableSignal<boolean>;

}
