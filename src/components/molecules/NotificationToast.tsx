"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Icon from "../atoms/Icon";
import { StatusType } from "../atoms/StatusChip";

interface NotificationToastProps {
  message: string;
  type: StatusType;
  duration?: number;
  onClose: () => void;
  className?: string;
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  message,
  type = "success",
  duration = 3000,
  onClose,
  className = "",
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeStyles = {
    success:
      "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-500",
    error:
      "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-500",
    info: "bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-500",
    processing:
      "bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-500",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`
          fixed bottom-4 right-4 z-50 max-w-sm px-4 py-3 rounded-lg shadow-lg 
          border-l-4 flex items-center justify-between
          ${typeStyles[type]} ${className}
        `}
        role="alert"
      >
        <div className="flex items-center">
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0"
          >
            <Icon type={type} className="h-5 w-5" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="ml-3"
          >
            <p className="text-sm font-medium">{message}</p>
          </motion.div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          className="ml-4 inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
          onClick={onClose}
        >
          <Icon type="close" className="h-5 w-5" />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default NotificationToast;
