import { useState, useEffect } from 'react';
import type { ThemeState } from '../types/editor';

export function useTheme(): [ThemeState['theme'], () => void] {
  const [theme, setTheme] = useState<ThemeState['theme']>('vs-dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('editor-theme');
    if (savedTheme === 'light' || savedTheme === 'vs-dark') {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'vs-dark' ? 'light' : 'vs-dark';
    setTheme(newTheme);
    localStorage.setItem('editor-theme', newTheme);
  };

  return [theme, toggleTheme];
}