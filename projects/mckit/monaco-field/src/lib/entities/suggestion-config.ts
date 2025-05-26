export interface MBSuggestionConfig {
  trigger: string;
  labelConfig: string;
  insertText: string;
  suggestions: MBSuggestion[];
}

export interface MBSuggestion {
  title: string;
  detail?: string;
}
