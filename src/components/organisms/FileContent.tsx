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
      className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 relative"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{file.name}</h3>
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
      <CodeDisplay content={file.text} />
    </motion.div>
  );
};

export default FileContent;
