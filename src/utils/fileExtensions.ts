interface LanguageConfig {
  extension: string;
  defaultContent: string;
}

export const languageConfigs: Record<string, LanguageConfig> = {
  javascript: {
    extension: '.js',
    defaultContent: '// JavaScript code goes here...\n\n',
  },
  typescript: {
    extension: '.ts',
    defaultContent: '// TypeScript code goes here...\n\n',
  },
  python: {
    extension: '.py',
    defaultContent: '# Python code goes here...\n\n',
  },
  java: {
    extension: '.java',
    defaultContent: 'public class Main {\n    public static void main(String[] args) {\n        // Java code goes here...\n    }\n}\n',
  },
  cpp: {
    extension: '.cpp',
    defaultContent: '#include <iostream>\n\nint main() {\n    // C++ code goes here...\n    return 0;\n}\n',
  },
};

export function getFileExtension(language: string): string {
  return languageConfigs[language]?.extension || '.txt';
}

export function getDefaultContent(language: string): string {
  return languageConfigs[language]?.defaultContent || '';
}