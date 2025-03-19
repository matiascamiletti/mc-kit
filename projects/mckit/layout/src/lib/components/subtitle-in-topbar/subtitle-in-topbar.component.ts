import { Component, inject, OnInit } from '@angular/core';
import { MCComponent, MCCoreComponent } from '@mckit/core';
import { MCTopbarService } from '@mckit/layout-core';

@Component({
    selector: 'lib-subtitle-in-topbar',
    imports: [],
    templateUrl: './subtitle-in-topbar.component.html',
    styleUrl: './subtitle-in-topbar.component.css'
})
export class SubtitleInTopbarComponent extends MCCoreComponent implements OnInit {
  topbarService: MCTopbarService = inject(MCTopbarService);

  ngOnInit(): void {
    this.topbarService.subtitle.update((res) => {
      if(res == '' && this.component.config != undefined && this.component.config.text != undefined){
        return this.component.config.text;
      }
      return res;
    });
  }
}

export class MCSubtitleInTopbar extends MCComponent {
  constructor(
    text: string
  ) {
    super(SubtitleInTopbarComponent);

    this.config = {
      text: text
    };
  }
}
