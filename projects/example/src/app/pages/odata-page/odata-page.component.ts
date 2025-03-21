import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MCOdataPage } from '../../../../../mckit/odata/src/public-api';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-odata-page',
  imports: [CommonModule, MCOdataPage],
  templateUrl: './odata-page.component.html',
  styleUrl: './odata-page.component.scss'
})
export class OdataPageComponent {

  breadcrumb: MenuItem[] = [
      { label: 'Home', routerLink: '/' },
      { label: 'Users' }
  ];

}
