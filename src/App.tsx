import React, { useState, useEffect } from 'react';
import { Editor } from './components/Editor';
import { Toolbar } from './components/Toolbar';
import { FileList } from './components/FileList';
import { CreateFileModal } from './components/CreateFileModal';
import { Terminal } from './components/Terminal';
import { api } from './services/api';
import { useTheme } from './hooks/useTheme';
import { getDefaultContent } from './utils/fileExtensions';
import type { File } from './types/file';

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const [terminalOutput, setTerminalOutput] = useState('');

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const response = await api.getFiles();
      setFiles(response.data);
      if (response.data.length > 0 && !selectedFile) {
        setSelectedFile(response.data[0]);
      }
    } catch (error) {
      console.error('Error loading files:', error);
    }
  };

  const handleCreateFile = async (name: string, language: string) => {
    try {
      const response = await api.createFile({
        name,
        content: getDefaultContent(language),
        language,
      });
      setFiles([response.data, ...files]);
      setSelectedFile(response.data);
    } catch (error) {
      console.error('Error creating file:', error);
    }
  };

  const handleDeleteFile = async (id: string) => {
    try {
      await api.deleteFile(id);
      setFiles(files.filter(f => f._id !== id));
      if (selectedFile?._id === id) {
        setSelectedFile(files.find(f => f._id !== id) || null);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleCodeChange = async (content: string | undefined) => {
    if (!selectedFile || !content) return;

    try {
      const response = await api.updateFile(selectedFile._id, { content });
      setSelectedFile(response.data);
      setFiles(files.map(f => f._id === response.data._id ? response.data : f));
    } catch (error) {
      console.error('Error updating file:', error);
    }
  };

  const handleLanguageChange = async (language: string) => {
    if (!selectedFile) return;

    try {
      const response = await api.updateFile(selectedFile._id, { language });
      setSelectedFile(response.data);
      setFiles(files.map(f => f._id === response.data._id ? response.data : f));
    } catch (error) {
      console.error('Error updating language:', error);
    }
  };

  const handleRunCode = async () => {
    if (!selectedFile) return;

    try {
      const response = await api.runCode(selectedFile._id);
      setTerminalOutput(response.data.output);
    } catch (error) {
      setTerminalOutput(`Error running code: ${error.message}`);
    }
  };

  return (
    <div className={`h-screen flex ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
      <FileList
        files={files}
        selectedFile={selectedFile}
        onFileSelect={setSelectedFile}
        onDeleteFile={handleDeleteFile}
        theme={theme}
      />
      <div className="flex-1 flex flex-col">
        <Toolbar
          language={selectedFile?.language || 'javascript'}
          theme={theme}
          onLanguageChange={handleLanguageChange}
          onThemeChange={toggleTheme}
          onCreateFile={() => setIsCreateModalOpen(true)}
        />
        <div className="flex-1 relative">
          {selectedFile && (
            <Editor
              state={{
                code: selectedFile.content,
                language: selectedFile.language,
                theme,
              }}
              onChange={handleCodeChange}
              onRun={handleRunCode}
            />
          )}
        </div>
        <Terminal theme={theme} output={terminalOutput} />
      </div>
      <CreateFileModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateFile={handleCreateFile}
      />
    </div>
  );
}

export default App;