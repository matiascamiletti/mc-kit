import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MCField, MCFieldComponent } from '@mckit/form';
import { QuillModule } from 'ngx-quill'

@Component({
  selector: 'mc-quill-field',
  imports: [CommonModule, ReactiveFormsModule, QuillModule],
  templateUrl: './quill-field.component.html',
  styleUrl: './quill-field.component.css'
})
export class QuillFieldComponent extends MCFieldComponent {

}

export class QuillField {

  static init(key: string|undefined, extra?: { height: number}): MCField {
    let extraData = {
      height: extra?.height || 250
    };
    return MCField.init({
      key: key,
      component: QuillFieldComponent,
      extra: extraData
    });
  }

}
