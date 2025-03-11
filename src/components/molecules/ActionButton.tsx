"use client";

import React from "react";
import Button from "../atoms/Button";
import Icon from "../atoms/Icon";

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  icon: React.ComponentProps<typeof Icon>["type"];
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
  disabled?: boolean;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onClick,
  icon,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      disabled={disabled}
      className={className}
    >
      <Icon type={icon} className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} />
      {label}
    </Button>
  );
};

export default ActionButton;
