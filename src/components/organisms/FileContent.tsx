"use client";

import React from "react";
import { motion } from "motion/react";
import { FileData } from "../../services/FileService";
import CodeDisplay from "../atoms/CodeDisplay";
import ActionButton from "../molecules/ActionButton";

interface FileContentProps {
  file: FileData;
  onCopy: () => void;
  onRemove: () => void;
}

const FileContent: React.FC<FileContentProps> = ({
  file,
  onCopy,
  onRemove,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-t-lg border border-gray-200 dark:border-gray-800">
        <h3 className="font-medium text-lg">{file.name}</h3>
        <div className="flex gap-2">
          <ActionButton
            label="Copy"
            icon="copy"
            onClick={onCopy}
            variant="primary"
            size="sm"
          />
          <ActionButton
            label="Remove"
            icon="delete"
            onClick={onRemove}
            variant="danger"
            size="sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-hidden rounded-b-lg border border-t-0 border-gray-200 dark:border-gray-800">
        <CodeDisplay
          content={file.text}
          maxHeight="h-full"
          className="h-full rounded-none border-0"
        />
      </div>
    </motion.div>
  );
};

export default FileContent;
