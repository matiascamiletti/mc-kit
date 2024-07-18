import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrintServiceComponent } from '../../../../../core/src/lib/components/print-service/print-service.component';
import { ID_SIDEBAR_MC_COMPONENT } from '../../services/sidebar.service';

@Component({
  selector: 'mc-basic-layout',
  standalone: true,
  imports: [RouterModule, PrintServiceComponent],
  templateUrl: './basic-layout.component.html',
  styleUrl: './basic-layout.component.scss'
})
export class BasicLayout {
  sidebarId = ID_SIDEBAR_MC_COMPONENT;
}
