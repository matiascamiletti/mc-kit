import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, PLATFORM_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MCField, MCFieldComponent } from '@mckit/form';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';


@Component({
  selector: 'mc-monaco-field',
  imports: [CommonModule, ReactiveFormsModule, MonacoEditorModule],
  templateUrl: './monaco-field.component.html',
  styleUrl: './monaco-field.component.css'
})
export class MonacoFieldComponent extends MCFieldComponent {

  platformId = inject(PLATFORM_ID);
  isClient = computed(() => {
    return isPlatformBrowser(this.platformId);
  });

  options = computed(() => {
    return { theme: 'vs-dark', language: this.field().config.language };
  });
}

export class MonacoField {

  static init(data: {
    key: string|undefined,
    language: string,
  }): MCField {
    let field = MCField.init({
      key: data.key,
      component: MonacoFieldComponent
    });
    field.config.language = data.language;

    return field;
  }

}
