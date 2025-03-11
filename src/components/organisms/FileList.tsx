"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { FileData } from "../../services/FileService";
import Button from "../atoms/Button";
import Icon from "../atoms/Icon";
import FileTabs from "./FileTabs";
import FileContent from "./FileContent";
import FileActions from "./FileActions";

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

  const handleSelectFile = (index: number) => {
    setActiveFileIndex(index);
  };

  const handleCopyFile = (index: number) => {
    const file = files[index];
    onCopyFile(file.text, file.name);
  };

  const handleRemoveFile = (index: number) => {
    const file = files[index];
    // If removing the active file, select the previous one
    if (index === activeFileIndex && index > 0) {
      setActiveFileIndex(index - 1);
    }
    onRemoveFile(file.name);
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-4">
        <FileActions
          onCopyAll={onCopyAll}
          onClearAll={onClearAll}
          fileCount={files.length}
        />

        {files.length > 1 && (
          <div className="flex space-x-2">
            <Button
              onClick={() =>
                setActiveFileIndex((prev) => Math.max(0, prev - 1))
              }
              disabled={activeFileIndex === 0}
              variant="secondary"
              size="sm"
            >
              <Icon type="previous" className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              onClick={() =>
                setActiveFileIndex((prev) =>
                  Math.min(files.length - 1, prev + 1)
                )
              }
              disabled={activeFileIndex === files.length - 1}
              variant="secondary"
              size="sm"
            >
              Next
              <Icon type="next" className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>

      {/* File tabs */}
      <FileTabs
        files={files}
        activeFileIndex={activeFileIndex}
        onSelectFile={handleSelectFile}
        onCopyFile={handleCopyFile}
        onRemoveFile={handleRemoveFile}
      />

      {/* Active file content */}
      <FileContent
        file={activeFile}
        onCopy={() => onCopyFile(activeFile.text, activeFile.name)}
        onRemove={() => {
          if (files.length > 1) {
            setActiveFileIndex(Math.max(0, activeFileIndex - 1));
          }
          onRemoveFile(activeFile.name);
        }}
      />
    </div>
  );
};

export default FileList;
