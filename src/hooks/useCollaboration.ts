import { useEffect, useRef } from 'react';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from 'y-monaco';
import { editor } from '@monaco-editor/react';

export function useCollaboration(
  editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>,
  roomId: string
) {
  const docRef = useRef<Y.Doc | null>(null);
  const providerRef = useRef<WebrtcProvider | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const doc = new Y.Doc();
    const provider = new WebrtcProvider(roomId, doc);
    const type = doc.getText('monaco');

    const binding = new MonacoBinding(
      type,
      editorRef.current.getModel()!,
      new Set([editorRef.current]),
      provider.awareness
    );

    docRef.current = doc;
    providerRef.current = provider;

    return () => {
      binding.destroy();
      provider.destroy();
      doc.destroy();
    };
  }, [editorRef, roomId]);

  return { doc: docRef.current, provider: providerRef.current };
}