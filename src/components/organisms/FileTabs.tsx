"use client";

import React from "react";
import { FileData } from "../../services/FileService";
import FileTab from "../molecules/FileTab";

interface FileTabsProps {
  files: FileData[];
  activeFileIndex: number;
  onSelectFile: (index: number) => void;
  onCopyFile: (index: number) => void;
  onRemoveFile: (index: number) => void;
}

const FileTabs: React.FC<FileTabsProps> = ({
  files,
  activeFileIndex,
  onSelectFile,
  onCopyFile,
  onRemoveFile,
}) => {
  if (files.length <= 1) return null;

  return (
    <div className="flex overflow-x-auto mb-2 pb-2">
      {files.map((file, index) => (
        <FileTab
          key={index}
          name={file.name}
          isActive={index === activeFileIndex}
          onSelect={() => onSelectFile(index)}
          onCopy={() => onCopyFile(index)}
          onRemove={() => onRemoveFile(index)}
          index={index}
        />
      ))}
    </div>
  );
};

export default FileTabs;
