import { Component, OnInit } from '@angular/core';
import { MCTopbarService } from '../../../../../mckit/layout/src/public-api';
import { MCSimplePage } from '../../../../../mckit/layout/src/lib/pages/simple-page/simple-page.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [MCSimplePage],
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
