"use client";

import React from "react";
import { motion } from "motion/react";
import { FileData } from "../../services/FileService";
import FileTab from "../molecules/FileTab";
import FileActions from "./FileActions";
import Icon from "../atoms/Icon";

interface SidebarProps {
  files: FileData[];
  activeFileIndex: number;
  onSelectFile: (index: number) => void;
  onCopyFile: (text: string, fileName: string) => void;
  onCopyAll: () => void;
  onRemoveFile: (fileName: string) => void;
  onClearAll: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  files,
  activeFileIndex,
  onSelectFile,
  onCopyFile,
  onCopyAll,
  onRemoveFile,
  onClearAll,
}) => {
  if (!files.length) return null;

  return (
    <div className="h-full flex flex-col">
      {/* Header with file actions */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <FileActions
          onCopyAll={onCopyAll}
          onClearAll={onClearAll}
          fileCount={files.length}
        />
      </div>

      {/* File list */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3">
        {files.map((file, index) => (
          <FileTab
            key={index}
            name={file.name}
            isActive={index === activeFileIndex}
            onSelect={() => onSelectFile(index)}
            onCopy={() => onCopyFile(file.text, file.name)}
            onRemove={() => onRemoveFile(file.name)}
            index={index}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      {files.length > 1 && (
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-2">
          <button
            onClick={() => onSelectFile(Math.max(0, activeFileIndex - 1))}
            disabled={activeFileIndex === 0}
            className={`
              flex items-center justify-center gap-1 px-3 py-2 rounded
              transition-colors duration-150 ease-in-out
              ${
                activeFileIndex === 0
                  ? "opacity-50 cursor-not-allowed bg-gray-200 dark:bg-gray-800"
                  : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
              }
            `}
          >
            <Icon type="previous" className="w-4 h-4" />
            <span className="text-sm">Previous</span>
          </button>
          <button
            onClick={() =>
              onSelectFile(Math.min(files.length - 1, activeFileIndex + 1))
            }
            disabled={activeFileIndex === files.length - 1}
            className={`
              flex items-center justify-center gap-1 px-3 py-2 rounded
              transition-colors duration-150 ease-in-out
              ${
                activeFileIndex === files.length - 1
                  ? "opacity-50 cursor-not-allowed bg-gray-200 dark:bg-gray-800"
                  : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
              }
            `}
          >
            <span className="text-sm">Next</span>
            <Icon type="next" className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
