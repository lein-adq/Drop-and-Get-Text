"use client";

import React from "react";
import { motion } from "motion/react";
import ProgressBar from "../atoms/ProgressBar";

interface ProcessingIndicatorProps {
  processed: number;
  total: number;
  className?: string;
}

const ProcessingIndicator: React.FC<ProcessingIndicatorProps> = ({
  processed,
  total,
  className = "",
}) => {
  const progress = total > 0 ? Math.round((processed / total) * 100) : 0;

  return (
    <motion.div
      className={`${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-1">
        <motion.div
          className="text-sm font-medium text-blue-700 dark:text-blue-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Processing files...
        </motion.div>
        <motion.div
          className="text-sm text-blue-700 dark:text-blue-400"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          key={progress}
          transition={{ type: "spring", stiffness: 500 }}
        >
          {progress}%
        </motion.div>
      </div>

      <ProgressBar progress={progress} />

      <motion.div
        className="text-xs text-gray-500 dark:text-gray-400 mt-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {processed} of {total} files processed
      </motion.div>
    </motion.div>
  );
};

export default ProcessingIndicator;
