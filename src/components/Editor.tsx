import { useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useCollaboration } from '../hooks/useCollaboration';
import type { EditorState } from '../types/editor';
import { editor } from '@monaco-editor/react';
import { PlayIcon } from '@heroicons/react/24/solid';

interface EditorProps {
  state: EditorState;
  onChange: (value: string | undefined) => void;
  onRun: () => void;
}

export function Editor({ state, onChange, onRun }: EditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  useCollaboration(editorRef, 'collaborative-editor-room');

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  return (
    <div className="relative h-full w-full">
      <button
        onClick={onRun}
        className="absolute top-2 right-2 z-10 flex items-center px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        <PlayIcon className="h-4 w-4 mr-1" />
        Run
      </button>
      <MonacoEditor
        height="100%"
        language={state.language}
        value={state.code}
        theme={state.theme}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          automaticLayout: true,
        }}
      />
    </div>
  );
}