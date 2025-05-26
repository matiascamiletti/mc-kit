import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'mc-simple-page',
    imports: [CommonModule, CardModule, BreadcrumbModule],
    templateUrl: './simple-page.component.html',
    styleUrl: './simple-page.component.css'
})
export class MCSimplePage {
  @Input() breadcrumb: MenuItem[] | undefined;
  @Input() title: string | undefined;
  @Input() subtitle: string | undefined;
}
