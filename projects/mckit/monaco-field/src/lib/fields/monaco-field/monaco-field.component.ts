import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, PLATFORM_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MCField, MCFieldComponent } from '@mckit/form';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import type * as monaco from 'monaco-editor';
import { MBSuggestionConfig } from '../../entities/suggestion-config';
import { MonacoFieldService } from '../../services/monaco-field.service';

declare const window: any;

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

  fieldService = inject(MonacoFieldService);

  getColorFromCssByVar(variable: string) {
    const rootElement = document.documentElement;
    const styles = window.getComputedStyle(rootElement);
    return styles.getPropertyValue(variable);
  }

  onInitEditor(editor: any) {
    this.initTheme();
    this.initSuggestions();
  }

  initSuggestions() {
    this.fieldService.cleanCompletionProviders();

    let config: MBSuggestionConfig = this.field().config.suggestionConfig;
    if(config == undefined||config.suggestions.length == 0){
      return;
    }

    let provider = window.monaco.languages.registerCompletionItemProvider(this.field().config.options.language, {
      triggerCharacters: [config.trigger],
      provideCompletionItems: (model: any, position: any) => {
        const wordRange = model.getWordUntilPosition(position);
        const range = new window.monaco.Range(
          position.lineNumber,
          position.column,
          position.lineNumber,
          position.column
        );

        const suggestions = config.suggestions.map((suggestion) => {

          let label = config.labelConfig.replace('__VAR__', suggestion.title);
          let insertText = config.insertText.replace('__VAR__', suggestion.title);

          return {
            label: label,
            kind: window.monaco.languages.CompletionItemKind.Snippet,
            insertText: insertText,
            range: range,
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: suggestion.detail,
          };

        });

        return { suggestions };
      }
    });
    this.fieldService.addCompletionProvider(provider);

    /*window.monaco.languages.setMonarchTokensProvider(this.field().config.options.language, {
      tokenizer: {
        root: [[/\{\{[^}]+\}\}/, 'custom-brace']]
      }
    });*/
  }

  initTheme() {
    window.monaco.editor.defineTheme('mckit-theme', {
      base: 'vs-dark',
      inherit: true,
      rules: [{ token: 'custom-brace', foreground: '#FF0000', fontStyle: 'bold' }],
      colors: {
        'editor.foreground': this.getColorFromCssByVar('--p-form-field-color'), // Asegurar que esta propiedad está definida
        'editor.background': this.getColorFromCssByVar('--p-select-background'),
      },
    });

    window.monaco.editor.setTheme('mckit-theme');
  }
}

export class MonacoField {

  static init(data: {
    key: string|undefined,
    language: string,
    options?: any
    suggestions?: MBSuggestionConfig
  }): MCField {
    let field = MCField.init({
      key: data.key,
      component: MonacoFieldComponent
    });
    field.config.options = data.options ?? {};
    field.config.options.theme = 'mckit-theme';
    field.config.options.language = data.language;
    field.config.suggestionConfig = data.suggestions;

    return field;
  }

  static initOneLine(data: {
    key: string|undefined,
    language: string,
    label?: string,
    suggestions?: MBSuggestionConfig
  }): MCField {
    let field = MCField.init({
      key: data.key,
      component: MonacoFieldComponent
    });
    field.config.label = data.label;
    field.config.class = 'monaco-one-line';
    field.config.suggestionConfig = data.suggestions;
    field.config.options = {
      theme: 'mckit-theme',
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
      fontSize: 14,

      wordBasedSuggestions: false, // Desactiva sugerencias basadas en palabras del documento
      quickSuggestions: { // Desactiva popups automáticos al escribir
        other: false,
        comments: false,
        strings: false
      },

      acceptSuggestionOnEnter: "on",
    };

    return field;
  }
}
