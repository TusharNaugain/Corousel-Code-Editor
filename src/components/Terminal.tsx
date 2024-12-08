import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { TrashIcon } from '@heroicons/react/24/outline';
import 'xterm/css/xterm.css';

interface TerminalProps {
  theme: 'vs-dark' | 'light';
  output: string;
}

export function Terminal({ theme, output }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new XTerm({
      theme: theme === 'light' ? {
        background: '#ffffff',
        foreground: '#000000',
      } : {
        background: '#1e1e1e',
        foreground: '#ffffff',
      },
      fontSize: 14,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      cursorBlink: true,
    });

    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();

    term.loadAddon(fitAddon);
    term.loadAddon(webLinksAddon);

    term.open(terminalRef.current);
    fitAddon.fit();

    xtermRef.current = term;

    const handleResize = () => {
      fitAddon.fit();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      term.dispose();
    };
  }, [theme]);

  useEffect(() => {
    if (xtermRef.current && output) {
      xtermRef.current.write(output + '\r\n');
    }
  }, [output]);

  const handleClear = () => {
    if (xtermRef.current) {
      xtermRef.current.clear();
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={handleClear}
          className={`p-2 rounded-md ${
            theme === 'light'
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
          } transition-colors duration-200`}
          title="Clear Terminal"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
      <div 
        ref={terminalRef} 
        className="h-48 border-t border-gray-200 dark:border-gray-700"
      />
    </div>
  );
}