"use client";

import React from "react";
import Icon from "../atoms/Icon";

interface EmptyStateProps {
  icon?: React.ComponentProps<typeof Icon>["type"];
  title: string;
  description: string;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "upload",
  title,
  description,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${className}`}
    >
      <Icon type={icon} className="w-12 h-12 mb-4 text-gray-400" />
      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">{title}</span>
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default EmptyState;
