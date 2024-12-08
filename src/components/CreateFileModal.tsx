import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { getFileExtension, getDefaultContent } from '../utils/fileExtensions';

interface CreateFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateFile: (name: string, language: string) => void;
}

export function CreateFileModal({ isOpen, onClose, onCreateFile }: CreateFileModalProps) {
  const [fileName, setFileName] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [extension, setExtension] = useState(getFileExtension('javascript'));

  useEffect(() => {
    const newExtension = getFileExtension(language);
    setExtension(newExtension);
    
    // Update filename extension if it exists
    if (fileName.includes('.')) {
      setFileName(fileName.split('.')[0] + newExtension);
    }
  }, [language]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalFileName = fileName.includes('.') ? fileName : `${fileName}${extension}`;
    onCreateFile(finalFileName, language);
    setFileName('');
    setLanguage('javascript');
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-sm">
          <Dialog.Title className="text-lg font-medium mb-4">Create New File</Dialog.Title>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  File Name
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                      className="flex-1 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter file name"
                      required
                    />
                    <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
                      {extension}
                    </span>
                  </div>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Language
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                  </select>
                </label>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}