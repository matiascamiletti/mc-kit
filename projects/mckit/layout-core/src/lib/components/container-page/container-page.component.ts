import { CommonModule } from '@angular/common';
import { Component, contentChild, input, signal } from '@angular/core';
import { MCPageHeadingComponent } from '../page-heading/page-heading.component';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MCRightHeaderPageTemplateDirective } from '../../directives/mc-right-header-page-template.directive';

@Component({
  selector: 'mc-container-page',
  imports: [CommonModule, MCPageHeadingComponent, ButtonModule, MCRightHeaderPageTemplateDirective],
  templateUrl: './container-page.component.html',
  styleUrl: './container-page.component.css'
})
export class MCContainerPageComponent {
  breadcrumb = input<Array<MenuItem>>();

  title = input<string>();
  subtitle = input<string>();

  isShowMoreOptions = signal<boolean>(false);

  rightHeaderTemplate = contentChild(MCRightHeaderPageTemplateDirective);

  toggleMoreOptions() {
    this.isShowMoreOptions.set(!this.isShowMoreOptions());
  }
}
