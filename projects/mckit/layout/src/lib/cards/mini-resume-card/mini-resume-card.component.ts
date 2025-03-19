import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'mc-mini-resume-card',
    imports: [CardModule],
    templateUrl: './mini-resume-card.component.html',
    styleUrl: './mini-resume-card.component.scss'
})
export class MCMiniResumeCard {
  @Input() title?: string|null;
  @Input() subtitle?: string|null;
  @Input() value?: string|null;
}
