import { Component, OnInit } from '@angular/core';
import { MCTopbarService } from '../../../../../mckit/layout/src/public-api';

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss'
})
export class TestPageComponent implements OnInit {

  constructor(
    protected topbarService: MCTopbarService
  ) { }

  ngOnInit(): void {
    this.topbarService.subtitle.update(() => 'Test Page');
  }

  ngAfterViewInit(): void {
  }


}
