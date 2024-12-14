import { Component, OnInit } from '@angular/core';
import { MCMiniResumeCard } from '../../../../../mckit/layout/src/public-api';
import { MCSimplePage } from '../../../../../mckit/layout/src/lib/pages/simple-page/simple-page.component';
import { MenuItem } from 'primeng/api';
import { CurrencyPipe } from '@angular/common';
import { MCTwoColumnItemComponent } from '../../../../../mckit/layout/src/lib/lists/two-column-item/two-column-item.component';
import { MCTopbarService } from '../../../../../mckit/layout-core/src/public-api';
import { MCFilterButtonComponent } from '../../../../../mckit/filter/src/public-api';
import { MCFilter } from '../../../../../mckit/filter/src/lib/entities/filter';

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [MCSimplePage, MCMiniResumeCard, CurrencyPipe, MCTwoColumnItemComponent, MCFilterButtonComponent],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss'
})
export class TestPageComponent implements OnInit {

  breadcrumb: MenuItem[] = [
    { label: 'Home', routerLink: '/' },
    { label: 'Test Page' }
  ];

  filterConfig = new MCFilter();

  constructor(
    protected topbarService: MCTopbarService
  ) { }

  ngOnInit(): void {
    this.topbarService.subtitle.update(() => 'Test Page');
    this.loadFilterConfig();
  }

  ngAfterViewInit(): void {
  }

  loadFilterConfig() {
    this.filterConfig.quickFilters = [
      {
        title: 'Game #',
        items: []
      }
    ];
  }
}
