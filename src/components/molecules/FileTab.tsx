"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Icon from "../atoms/Icon";

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
  index,
}) => {
  const buttonStyle = isActive
    ? "bg-gray-200 dark:bg-gray-800 font-medium"
    : "bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800";

  return (
    <motion.div
      className="flex items-center mr-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
    >
      <div className="flex h-full">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSelect}
          className={`px-3 py-1 rounded-l flex items-center ${buttonStyle}`}
        >
          <Image
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
            className="mr-2"
          />
          <span className="truncate max-w-[150px]">{name}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCopy}
          className={`px-2 py-1 border-r border-gray-300 dark:border-gray-700 ${buttonStyle}`}
          title="Copy file content"
        >
          <Icon type="copy" className="h-4 w-4" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRemove}
          className={`px-2 py-1 rounded-r ${buttonStyle}`}
          title="Remove file"
        >
          <Icon type="delete" className="h-4 w-4 text-red-500" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FileTab;
