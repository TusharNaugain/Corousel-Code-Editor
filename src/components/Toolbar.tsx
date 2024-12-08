import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { CodeBracketIcon, SunIcon, MoonIcon, PlusIcon } from '@heroicons/react/24/outline';

interface ToolbarProps {
  language: string;
  theme: 'vs-dark' | 'light';
  onLanguageChange: (language: string) => void;
  onThemeChange: () => void;
  onCreateFile: () => void;
}

const LANGUAGES = ['javascript', 'typescript', 'python', 'java', 'cpp'];

export function Toolbar({
  language,
  theme,
  onLanguageChange,
  onThemeChange,
  onCreateFile,
}: ToolbarProps) {
  return (
    <div className={`flex items-center justify-between p-2 ${
      theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'
    } ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
      <div className="flex items-center space-x-4">
        <Menu as="div" className="relative">
          <Menu.Button className={`flex items-center space-x-2 px-3 py-2 rounded ${
            theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-700'
          }`}>
            <CodeBracketIcon className="h-5 w-5" />
            <span className="capitalize">{language}</span>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {LANGUAGES.map((lang) => (
                  <Menu.Item key={lang}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block w-full text-left px-4 py-2 text-sm text-gray-700 capitalize`}
                        onClick={() => onLanguageChange(lang)}
                      >
                        {lang}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onCreateFile}
          className={`p-2 rounded ${
            theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-700'
          }`}
        >
          <PlusIcon className="h-5 w-5" />
        </button>
        <button
          onClick={onThemeChange}
          className={`p-2 rounded ${
            theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-700'
          }`}
        >
          {theme === 'vs-dark' ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
}