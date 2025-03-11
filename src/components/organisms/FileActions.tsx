"use client";

import React from "react";
import ActionButton from "../molecules/ActionButton";

interface FileActionsProps {
  onCopyAll: () => void;
  onClearAll: () => void;
  fileCount: number;
}

const FileActions: React.FC<FileActionsProps> = ({
  onCopyAll,
  onClearAll,
  fileCount,
}) => {
  return (
    <div className="flex items-center gap-3">
      <h2 className="text-xl font-semibold">Files ({fileCount})</h2>
      <div className="flex gap-2">
        <ActionButton
          label="Copy All"
          icon="copy"
          onClick={onCopyAll}
          variant="primary"
          size="sm"
        />
        <ActionButton
          label="Clear All"
          icon="delete"
          onClick={onClearAll}
          variant="danger"
          size="sm"
        />
      </div>
    </div>
  );
};

export default FileActions;
