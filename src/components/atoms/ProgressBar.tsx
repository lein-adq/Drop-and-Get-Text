"use client";

import React from "react";
import { motion } from "motion/react";

interface ProgressBarProps {
  progress: number;
  className?: string;
  height?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className = "",
  height = "h-2.5",
}) => {
  return (
    <div
      className={`w-full bg-gray-200 rounded-full ${height} dark:bg-gray-700 ${className}`}
    >
      <motion.div
        className={`bg-blue-600 ${height} rounded-full`}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ type: "spring", damping: 15, stiffness: 100 }}
      ></motion.div>
    </div>
  );
};

export default ProgressBar;
