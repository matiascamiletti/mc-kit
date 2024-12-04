import { Component, Signal, viewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';


@Component({
  selector: 'mc-filter-panel',
  standalone: true,
  imports: [OverlayPanelModule, ButtonModule],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.css'
})
export class MCFilterPanelComponent {
  overlayPanel: Signal<OverlayPanel> = viewChild.required('overlayPanel');

  toggle($event: any): void {
    this.overlayPanel().toggle($event);
  }
}
