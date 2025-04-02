import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, PLATFORM_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MCField, MCFieldComponent } from '@mckit/form';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

declare const document: any;

@Component({
  selector: 'mc-monaco-field',
  imports: [CommonModule, ReactiveFormsModule, MonacoEditorModule],
  templateUrl: './monaco-field.component.html',
  styleUrl: './monaco-field.component.scss'
})
export class MonacoFieldComponent extends MCFieldComponent {

  platformId = inject(PLATFORM_ID);
  isClient = computed(() => {
    return isPlatformBrowser(this.platformId);
  });

  options = computed(() => {
    return this.field().config.options;
  });
}

export class MonacoField {

  static init(data: {
    key: string|undefined,
    language: string,
    options?: any
  }): MCField {
    let field = MCField.init({
      key: data.key,
      component: MonacoFieldComponent
    });
    field.config.options = data.options ?? {};
    field.config.options.theme = 'vs-dark';
    field.config.options.language = data.language;

    return field;
  }

  static initOneLine(data: {
    key: string|undefined,
    language: string,
    label?: string
  }): MCField {
    let field = MCField.init({
      key: data.key,
      component: MonacoFieldComponent
    });
    field.config.label = data.label;
    field.config.class = 'monaco-one-line';
    field.config.options = {
      theme: 'vs-dark',
      language: data.language,
      lineNumbers: "off",
      glyphMargin: false,
      folding: false,
      lineDecorationsWidth: 0,
      lineNumbersMinChars: 0,
      minimap: { enabled: false },
      overviewRulerLanes: 0,
      hideCursorInOverviewRuler: true,
      renderLineHighlight: 'none', // Quita el resaltado de línea activa
      renderIndentGuides: false, // Quita las guías de indentación
      scrollBeyondLastLine: false, // No permite scroll más allá del contenido

      // Scrollbars (ocultas por el overflow: hidden del wrapper, pero por si acaso)
      scrollbar: {
        vertical: 'hidden',
        horizontal: 'hidden',
        // handleMouseWheel: false // Deshabilita scroll con rueda (opcional)
      },

      // Padding interno (ajusta para centrar verticalmente el texto)
      padding: {
        top: 6, // Ajusta estos valores
        bottom: 6,
        left: 10
      },

      // Comportamiento
      wordWrap: 'off', // Para que actúe más como input (no multi-línea automático)
      automaticLayout: true, // Ayuda a que se ajuste si el contenedor cambia de tamaño
      // contextmenu: false, // Deshabilita menú contextual (opcional)
      fontSize: 14
    };

    return field;
  }
}
