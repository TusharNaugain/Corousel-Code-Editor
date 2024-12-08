import React from 'react';
import { File } from '../types/file';
import { TrashIcon } from '@heroicons/react/24/outline';

interface FileListProps {
  files: File[];
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onDeleteFile: (id: string) => void;
  theme: 'vs-dark' | 'light';
}

export function FileList({ files, onFileSelect, selectedFile, onDeleteFile, theme }: FileListProps) {
  const handleDeleteClick = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this file?')) {
      onDeleteFile(id);
    }
  };

  return (
    <div className={`w-64 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'} p-4 overflow-y-auto`}>
      <h2 className={`${theme === 'light' ? 'text-gray-800' : 'text-white'} text-lg font-semibold mb-4`}>Files</h2>
      <div className="space-y-2">
        {files.map((file) => (
          <div
            key={file._id}
            className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer ${
              selectedFile?._id === file._id
                ? 'bg-blue-600 text-white'
                : theme === 'light'
                ? 'text-gray-800 hover:bg-gray-200'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
            onClick={() => onFileSelect(file)}
          >
            <span className="flex-1 truncate">{file.name}</span>
            <button
              onClick={(e) => handleDeleteClick(file._id, e)}
              className={`ml-2 p-1 rounded-full hover:bg-gray-700 ${
                selectedFile?._id === file._id ? 'text-white' : 'text-gray-400'
              }`}
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}