"use client";

import React, { useState, useCallback, useRef } from "react";

// Types
export interface FileValidationOptions {
  acceptedFileTypes?: string[];
  maxFileSizeMB?: number;
  maxFiles?: number;
}

export interface FileWithStatus {
  file: File;
  status: "pending" | "success" | "error";
  error?: string;
}

export interface ProcessedFile {
  name: string;
  text: string;
  status: "success" | "error";
  error?: string;
}

interface FileDropZoneProps {
  onFilesAccepted: (files: File[]) => void;
  className?: string;
  validationOptions?: FileValidationOptions;
  renderDropContent?: (isDragging: boolean) => React.ReactNode;
}

// Component
const FileDropZone: React.FC<FileDropZoneProps> = ({
  onFilesAccepted,
  className = "",
  validationOptions = {},
  renderDropContent,
}) => {
  // Default validation options
  const {
    acceptedFileTypes = [],
    maxFileSizeMB = 10,
    maxFiles = 20,
  } = validationOptions;

  // State
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Refs
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Convert MB to bytes
  const maxFileSize = maxFileSizeMB * 1024 * 1024;

  // Handlers
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setError(null);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Only set isDragging to false if we're leaving the dropzone (not a child element)
    if (e.currentTarget === dropZoneRef.current) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  // File validation
  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file size
    if (file.size > maxFileSize) {
      return {
        valid: false,
        error: `File size exceeds the maximum limit of ${maxFileSizeMB}MB`,
      };
    }

    // If no specific file types are specified, accept all files
    if (acceptedFileTypes.length === 0) {
      return { valid: true };
    }

    // Check if the file type is in the accepted list
    const fileType = file.type.toLowerCase();
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";

    // Accept if either the MIME type or extension matches
    const isAccepted = acceptedFileTypes.some((type) => {
      // Check if it's a MIME type pattern
      if (type.includes("/")) {
        return fileType === type || fileType.startsWith(type.replace("*", ""));
      }
      // Check if it's an extension
      return fileExtension === type.replace(".", "");
    });

    if (!isAccepted) {
      return { valid: false, error: "File type not accepted" };
    }

    return { valid: true };
  };

  // Handle file drop
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      setError(null);

      const files = Array.from(e.dataTransfer.files);

      if (files.length === 0) {
        return;
      }

      // Check if too many files are dropped
      if (files.length > maxFiles) {
        setError(`Too many files. Maximum allowed: ${maxFiles}`);
        return;
      }

      // Validate files
      const validFiles = files.filter((file) => {
        const validation = validateFile(file);
        if (!validation.valid && validation.error) {
          // Show the first error in the main error display
          if (!error) {
            setError(validation.error);
          }
          return false;
        }
        return true;
      });

      // Pass valid files to the parent component
      if (validFiles.length > 0) {
        onFilesAccepted(validFiles);
      }
    },
    [onFilesAccepted, maxFiles, maxFileSize, acceptedFileTypes, error]
  );

  // Handle file input change
  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const files = Array.from(e.target.files);

        // Check if too many files are selected
        if (files.length > maxFiles) {
          setError(`Too many files. Maximum allowed: ${maxFiles}`);
          return;
        }

        // Validate files
        const validFiles = files.filter((file) => {
          const validation = validateFile(file);
          if (!validation.valid && validation.error) {
            if (!error) {
              setError(validation.error);
            }
            return false;
          }
          return true;
        });

        // Pass valid files to the parent component
        if (validFiles.length > 0) {
          onFilesAccepted(validFiles);
        }
      }
    },
    [onFilesAccepted, maxFiles, error]
  );

  // Default drop zone content
  const defaultDropContent = (
    <div className="flex flex-col items-center justify-center text-center">
      <svg
        className={`w-12 h-12 mb-4 ${
          isDragging ? "text-blue-500" : "text-gray-400"
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        ></path>
      </svg>

      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span> or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Drop up to {maxFiles} text files
      </p>

      {error && <div className="mt-4 text-sm text-red-500">{error}</div>}
    </div>
  );

  return (
    <div
      ref={dropZoneRef}
      className={`relative border-2 ${
        isDragging
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
          : "border-dashed border-gray-300 dark:border-gray-700"
      } rounded-lg p-8 transition-colors ${className}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
        onChange={handleFileInputChange}
        multiple
        tabIndex={-1}
      />
      {renderDropContent ? renderDropContent(isDragging) : defaultDropContent}
    </div>
  );
};

export default FileDropZone;
