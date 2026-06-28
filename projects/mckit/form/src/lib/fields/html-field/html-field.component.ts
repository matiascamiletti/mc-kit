import { Component, inject } from '@angular/core';
import { MCFieldComponent } from '../mc-field.component';
import { MCField } from '../../entities/mc-field';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'mc-html-field',
  imports: [],
  templateUrl: './html-field.component.html',
  styleUrl: './html-field.component.css'
})
export class HtmlFieldComponent extends MCFieldComponent {

  sanitizerHtml = inject(DomSanitizer);

  htmlContent() {
    return this.sanitizerHtml.bypassSecurityTrustHtml(this.field().config.content || '');
  }
}

export class HtmlField {

  static init(content: string|undefined): MCField {
    let field = MCField.init({
      component: HtmlFieldComponent,
      no_control: true,
    });
    field.config.content = content;
    return field;
  }

}