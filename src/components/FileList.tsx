"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { FileData } from "./FileService";

interface FileListProps {
  files: FileData[];
  onCopyFile: (text: string, fileName: string) => void;
  onCopyAll: () => void;
  onRemoveFile: (fileName: string) => void;
  onClearAll: () => void;
}

const FileList: React.FC<FileListProps> = ({
  files,
  onCopyFile,
  onCopyAll,
  onRemoveFile,
  onClearAll,
}) => {
  const [activeFileIndex, setActiveFileIndex] = useState<number>(0);

  if (!files.length) return null;

  const activeFile = files[activeFileIndex];

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Files ({files.length})</h2>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCopyAll}
              className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy All
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClearAll}
              className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Clear All
            </motion.button>
          </div>
        </div>
        {files.length > 1 && (
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setActiveFileIndex((prev) => Math.max(0, prev - 1))
              }
              disabled={activeFileIndex === 0}
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 disabled:opacity-50"
            >
              Previous
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setActiveFileIndex((prev) =>
                  Math.min(files.length - 1, prev + 1)
                )
              }
              disabled={activeFileIndex === files.length - 1}
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 disabled:opacity-50"
            >
              Next
            </motion.button>
          </div>
        )}
      </div>

      {/* File tabs */}
      {files.length > 1 && (
        <div className="flex overflow-x-auto mb-2 pb-2">
          {files.map((file, index) => (
            <motion.div 
              key={index} 
              className="flex items-center mr-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFileIndex(index)}
                className={`px-3 py-1 rounded-l flex items-center ${
                  index === activeFileIndex
                    ? "bg-gray-200 dark:bg-gray-800 font-medium"
                    : "bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <Image
                  src="/file.svg"
                  alt="File icon"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                <span className="truncate max-w-[150px]">{file.name}</span>
              </motion.button>
              <div className="flex">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onCopyFile(file.text, file.name)}
                  className={`px-2 py-1 border-r border-gray-300 dark:border-gray-700 ${
                    index === activeFileIndex
                      ? "bg-gray-200 dark:bg-gray-800"
                      : "bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800"
                  }`}
                  title="Copy file content"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (index === activeFileIndex && index > 0) {
                      setActiveFileIndex(index - 1);
                    }
                    onRemoveFile(file.name);
                  }}
                  className={`px-2 py-1 rounded-r ${
                    index === activeFileIndex
                      ? "bg-gray-200 dark:bg-gray-800"
                      : "bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800"
                  }`}
                  title="Remove file"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Active file content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        key={activeFileIndex}
        className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 relative"
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">{activeFile.name}</h3>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCopyFile(activeFile.text, activeFile.name)}
              className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (files.length > 1) {
                  setActiveFileIndex(Math.max(0, activeFileIndex - 1));
                }
                onRemoveFile(activeFile.name);
              }}
              className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Remove
            </motion.button>
          </div>
        </div>
        <pre className="whitespace-pre-wrap break-words bg-white dark:bg-black p-4 rounded border border-gray-200 dark:border-gray-800 max-h-96 overflow-y-auto font-mono text-sm">
          {activeFile.text}
        </pre>
      </motion.div>
    </div>
  );
};

export default FileList;
