import { Component } from '@angular/core';
import { MCOdataGridPage } from '../../../../../mckit/odata/src/lib/pages/odata-grid-page/odata-grid-page.component';
import { CommonModule } from '@angular/common';
import { MCPageTitleComponent } from '../../../../../mckit/layout-axis/src/public-api';
import { OdataPageComponent } from '../odata-page/odata-page.component';
import { ButtonModule } from 'primeng/button';
import { MCActionsColumn, MCTdTemplateDirective, MCThTemplateDirective } from '../../../../../mckit/table/src/public-api';
import { MCItemGridTemplateDirective, MCRightHeaderTemplateDirective } from '../../../../../mckit/odata/src/public-api';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-odata-grid-page',
  imports: [
    CommonModule,
    MCPageTitleComponent,
    MCOdataGridPage,
    MCItemGridTemplateDirective,
    CardModule,
    ButtonModule, MCThTemplateDirective, MCTdTemplateDirective, MCActionsColumn, MCRightHeaderTemplateDirective, CheckboxModule
  ],
  templateUrl: './odata-grid-page.component.html',
  styleUrl: './odata-grid-page.component.scss',
})
export class OdataGridPageComponent extends OdataPageComponent {

}
