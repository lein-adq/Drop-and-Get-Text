"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { FileData } from "../../services/FileService";
import Button from "../atoms/Button";
import Icon from "../atoms/Icon";
import FileActions from "./FileActions";

interface FileListProps {
  files: FileData[];
  onCopyFile: (text: string, fileName: string) => void;
  onCopyAll: () => void;
  onRemoveFile: (fileName: string) => void;
  onClearAll: () => void;
  activeFileIndex?: number;
  onSelectFile?: (index: number) => void;
}

const FileList: React.FC<FileListProps> = ({
  files,
  onCopyFile,
  onCopyAll,
  onRemoveFile,
  onClearAll,
  activeFileIndex = 0,
  onSelectFile,
}) => {
  const [internalActiveFileIndex, setInternalActiveFileIndex] = useState<number>(activeFileIndex);

  // Use the external activeFileIndex if provided
  const effectiveActiveFileIndex = onSelectFile ? activeFileIndex : internalActiveFileIndex;

  if (!files.length) return null;

  const handleSelectFile = (index: number) => {
    if (onSelectFile) {
      onSelectFile(index);
    } else {
      setInternalActiveFileIndex(index);
    }
  };

  const handleCopyFile = (index: number) => {
    const file = files[index];
    onCopyFile(file.text, file.name);
  };

  const handleRemoveFile = (index: number) => {
    const file = files[index];
    // If removing the active file, select the previous one
    if (index === effectiveActiveFileIndex && index > 0) {
      handleSelectFile(index - 1);
    }
    onRemoveFile(file.name);
  };

  return (
    <div className="h-full flex flex-col">
      {/* File actions at the top */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <FileActions
          onCopyAll={onCopyAll}
          onClearAll={onClearAll}
          fileCount={files.length}
        />
      </div>
      
      {/* File items list */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col space-y-2">
          {files.map((file, index) => {
            const isActive = index === effectiveActiveFileIndex;
            const buttonStyle = isActive
              ? "bg-gray-200 dark:bg-gray-800 font-medium"
              : "bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800";
            
            return (
              <div
                key={index}
                className="w-full mb-2"
              >
                <div className="grid grid-cols-[1fr_auto_auto] w-full">
                  <button
                    onClick={() => handleSelectFile(index)}
                    className={`px-3 py-2 rounded-l flex items-center ${buttonStyle}`}
                  >
                    <Image
                      src="/file.svg"
                      alt="File icon"
                      width={16}
                      height={16}
                      className="mr-2 flex-shrink-0"
                    />
                    <span className="truncate">{file.name}</span>
                  </button>

                  <button
                    onClick={() => handleCopyFile(index)}
                    className={`px-2 py-2 border-r border-gray-300 dark:border-gray-700 ${buttonStyle}`}
                    title="Copy file content"
                  >
                    <Icon type="copy" className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => handleRemoveFile(index)}
                    className={`px-2 py-2 rounded-r ${buttonStyle}`}
                    title="Remove file"
                  >
                    <Icon type="delete" className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation buttons */}
      {files.length > 1 && (
        <div className="flex justify-between p-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            onClick={() => handleSelectFile(Math.max(0, effectiveActiveFileIndex - 1))}
            disabled={effectiveActiveFileIndex === 0}
            variant="secondary"
            size="sm"
            className="w-full mr-1"
          >
            <Icon type="previous" className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            onClick={() => handleSelectFile(Math.min(files.length - 1, effectiveActiveFileIndex + 1))}
            disabled={effectiveActiveFileIndex === files.length - 1}
            variant="secondary"
            size="sm"
            className="w-full ml-1"
          >
            Next
            <Icon type="next" className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileList;
