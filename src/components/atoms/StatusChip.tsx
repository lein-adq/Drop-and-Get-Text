"use client";

import React from "react";
import Icon from "./Icon";

export type StatusType = "success" | "error" | "info" | "processing";

interface StatusChipProps {
  status: StatusType;
  label: string;
  className?: string;
}

const StatusChip: React.FC<StatusChipProps> = ({
  status,
  label,
  className = "",
}) => {
  const statusStyles = {
    success:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    error: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    processing:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 animate-pulse",
  };

  return (
    <div
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]} ${className}`}
    >
      <Icon type={status} className="h-4 w-4 mr-1" />
      {label}
    </div>
  );
};

export default StatusChip;
