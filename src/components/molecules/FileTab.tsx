"use client";

import React from "react";
import Image from "next/image";
import Icon from "../atoms/Icon";
import { motion } from "motion/react";

interface FileTabProps {
  name: string;
  isActive: boolean;
  onSelect: () => void;
  onCopy: () => void;
  onRemove: () => void;
  index: number;
}

const FileTab: React.FC<FileTabProps> = ({
  name,
  isActive,
  onSelect,
  onCopy,
  onRemove,
}) => {
  const buttonStyle = isActive
    ? "bg-gray-200 dark:bg-gray-800 font-medium"
    : "bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800";

  return (
    <div className="flex mb-2 w-full">
      <motion.button
        onClick={onSelect}
        whileTap={{ scale: 0.95 }}
        className={`px-3 py-1 rounded-l flex items-center flex-1
          transition-colors duration-150 ease-in-out ${buttonStyle}`}
      >
        <Image
          src="/file.svg"
          alt="File icon"
          width={16}
          height={16}
          className="mr-2 flex-shrink-0"
        />
        <span className="truncate">{name}</span>
      </motion.button>

      <motion.button
        onClick={onCopy}
        whileTap={{ scale: 0.95 }}
        className={`px-2 py-1 border-r border-gray-300 dark:border-gray-700
          transition-colors duration-150 ease-in-out ${buttonStyle}`}
        title="Copy file content"
      >
        <Icon type="copy" className="h-4 w-4" />
      </motion.button>

      <motion.button
        onClick={onRemove}
        whileTap={{ scale: 0.95 }}
        className={`px-2 py-1 rounded-r
          transition-colors duration-150 ease-in-out ${buttonStyle}`}
        title="Remove file"
      >
        <Icon type="delete" className="h-4 w-4 text-red-500" />
      </motion.button>
    </div>
  );
};

export default FileTab;
