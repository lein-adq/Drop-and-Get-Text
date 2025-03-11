"use client";

import React from "react";
import { motion } from "motion/react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
  title?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  title,
  type = "button",
}) => {
  const variantStyles = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary:
      "bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    ghost:
      "hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700",
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-md font-medium transition-colors
        flex items-center gap-2 justify-center
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      title={title}
      type={type}
    >
      {children}
    </motion.button>
  );
};

export default Button;
