export interface EditorState {
  code: string;
  language: string;
  theme: 'vs-dark' | 'light';
}

export interface User {
  id: string;
  name: string;
  color: string;
}

export interface ThemeState {
  theme: 'vs-dark' | 'light';
}