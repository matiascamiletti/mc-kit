import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { NGX_MONACO_EDITOR_CONFIG } from 'ngx-monaco-editor-v2';
import { MonacoField, MonacoFieldComponent } from './monaco-field.component';
import { MonacoFieldService } from '../../services/monaco-field.service';

describe('MonacoFieldComponent', () => {
  let component: MonacoFieldComponent;
  let fixture: ComponentFixture<MonacoFieldComponent>;
  let fieldService: MonacoFieldService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonacoFieldComponent],
      providers: [
        { provide: NGX_MONACO_EDITOR_CONFIG, useValue: {} },
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    }).compileComponents();

    fieldService = TestBed.inject(MonacoFieldService);
    fixture = TestBed.createComponent(MonacoFieldComponent);
    component = fixture.componentInstance;

    const field = MonacoField.init({
      key: 'code',
      language: 'json',
      options: { readOnly: false },
    });
    fixture.componentRef.setInput('field', field);
    fixture.componentRef.setInput('control', new UntypedFormControl('{}'));
    fixture.detectChanges();
  });

  it('should create and compute editor options from field config', () => {
    expect(component).toBeTruthy();
    expect(component.options().language).toBe('json');
    expect(component.options().theme).toBe('mckit-theme');
  });

  it('should configure multi-line and one-line fields via MonacoField.init and MonacoField.initOneLine', () => {
    const multiField = MonacoField.init({
      key: 'script',
      language: 'javascript',
    });
    expect(multiField.key).toBe('script');
    expect(multiField.config.options.language).toBe('javascript');
    expect(multiField.config.options.theme).toBe('mckit-theme');

    const oneLineField = MonacoField.initOneLine({
      key: 'expression',
      language: 'handlebars',
      label: 'Expression',
    });
    expect(oneLineField.key).toBe('expression');
    expect(oneLineField.config.label).toBe('Expression');
    expect(oneLineField.config.class).toBe('monaco-one-line');
    expect(oneLineField.config.options.lineNumbers).toBe('off');
    expect(oneLineField.config.options.wordWrap).toBe('off');
  });

  it('should register completion provider when suggestionConfig is provided', () => {
    const disposable = { dispose: jasmine.createSpy('dispose') };
    (window as any).monaco = {
      Range: function (l1: number, c1: number, l2: number, c2: number) {
        return { l1, c1, l2, c2 };
      },
      languages: {
        CompletionItemKind: { Snippet: 1 },
        CompletionItemInsertTextRule: { InsertAsSnippet: 4 },
        registerCompletionItemProvider: jasmine
          .createSpy('registerCompletionItemProvider')
          .and.returnValue(disposable),
      },
      editor: {
        defineTheme: jasmine.createSpy('defineTheme'),
        setTheme: jasmine.createSpy('setTheme'),
      },
    };

    const fieldWithSuggestions = MonacoField.init({
      key: 'template',
      language: 'html',
      suggestions: {
        trigger: '{',
        labelConfig: '{{__VAR__}}',
        insertText: '{{__VAR__}}',
        suggestions: [{ title: 'username', detail: 'User name' }],
      },
    });
    fixture.componentRef.setInput('field', fieldWithSuggestions);
    fixture.detectChanges();

    component.onInitEditor({});

    expect((window as any).monaco.editor.defineTheme).toHaveBeenCalled();
    expect((window as any).monaco.editor.setTheme).toHaveBeenCalledWith('mckit-theme');
    expect((window as any).monaco.languages.registerCompletionItemProvider).toHaveBeenCalled();
    expect(fieldService.completionProviders).toContain(disposable);
  });
});
