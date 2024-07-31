import { Component, OnInit } from '@angular/core';
import { MCTopbarService, MCMiniResumeCard } from '../../../../../mckit/layout/src/public-api';
import { MCSimplePage } from '../../../../../mckit/layout/src/lib/pages/simple-page/simple-page.component';
import { MenuItem } from 'primeng/api';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [MCSimplePage, MCMiniResumeCard, CurrencyPipe],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss'
})
export class TestPageComponent implements OnInit {

  breadcrumb: MenuItem[] = [
    { label: 'Home', routerLink: '/' },
    { label: 'Test Page' }
  ];

  constructor(
    protected topbarService: MCTopbarService
  ) { }

  ngOnInit(): void {
    this.topbarService.subtitle.update(() => 'Test Page');
  }

  ngAfterViewInit(): void {
  }


}
