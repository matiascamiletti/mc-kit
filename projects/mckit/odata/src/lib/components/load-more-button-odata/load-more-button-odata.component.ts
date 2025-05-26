import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output, signal } from '@angular/core';
import { MCListResponse } from '@mckit/core';
import { ButtonModule } from 'primeng/button';
import { MCOdata } from '../../entities/mc-odata';

export interface MCLoadMoreClick {
  odata: MCOdata;
  setResult: (data: MCListResponse<any>) => void;
}

@Component({
  selector: 'mc-load-more-button-odata',
  imports: [CommonModule, ButtonModule],
  templateUrl: './load-more-button-odata.component.html',
  styleUrl: './load-more-button-odata.component.css'
})
export class MCLoadMoreButtonOdata implements OnInit {

  initialOdata = input.required<MCOdata>();
  label = input.required<string>();

  clickMore = output<MCLoadMoreClick>();

  isLoading = signal(false);

  odata!: MCOdata;

  isShow = signal(true);

  ngOnInit(): void {
    this.odata = this.initialOdata().clone();
  }

  setResult(data: MCListResponse<any>): void {
    this.odata.skip = (this.odata.skip || 0) + data.data.length;
    this.isShow.set(this.odata.skip < (data.total ?? 0));
    this.isLoading.set(false);
  }

  onClick() {
    this.isLoading.set(true);
    this.clickMore.emit({
      odata: this.odata,
      setResult: (data) => this.setResult(data)
    });
  }
}
