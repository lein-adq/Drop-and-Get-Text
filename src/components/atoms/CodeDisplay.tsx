"use client";

import React from "react";
import { motion } from "motion/react";

interface CodeDisplayProps {
  content: string;
  className?: string;
  maxHeight?: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({
  content,
  className = "",
  maxHeight = "max-h-96",
}) => {
  return (
    <motion.pre
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`
        whitespace-pre-wrap break-words 
        bg-white dark:bg-black 
        p-4 rounded border 
        border-gray-200 dark:border-gray-800 
        overflow-y-auto font-mono text-sm
        ${maxHeight}
        ${className}
      `}
    >
      {content}
    </motion.pre>
  );
};

export default CodeDisplay;
