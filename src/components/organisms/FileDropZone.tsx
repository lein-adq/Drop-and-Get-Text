"use client";

import React, { useState, useCallback, useRef } from "react";
import { motion } from "motion/react";
import EmptyState from "../molecules/EmptyState";
import Icon from "../atoms/Icon";

// Types
export interface FileValidationOptions {
  acceptedFileTypes?: string[];
  maxFileSizeMB?: number;
  maxFiles?: number;
}

interface FileDropZoneProps {
  onFilesAccepted: (files: File[]) => void;
  className?: string;
  validationOptions?: FileValidationOptions;
  compact?: boolean; // New prop for compact mode
}

const FileDropZone: React.FC<FileDropZoneProps> = ({
  onFilesAccepted,
  className = "",
  validationOptions = {},
  compact = false,
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
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Function to recursively get all files from a directory entry
  const getAllFilesFromDirectory = async (
    entry: FileSystemDirectoryEntry
  ): Promise<File[]> => {
    const files: File[] = [];
    const reader = entry.createReader();

    const readEntries = (): Promise<FileSystemEntry[]> => {
      return new Promise((resolve, reject) => {
        reader.readEntries(resolve, reject);
      });
    };

    const getFile = (fileEntry: FileSystemFileEntry): Promise<File> => {
      return new Promise((resolve, reject) => {
        fileEntry.file(resolve, reject);
      });
    };

    let entries: FileSystemEntry[] = [];
    do {
      const batch = await readEntries();
      if (!batch.length) break;
      entries = entries.concat(batch);
    } while (true);

    for (const entry of entries) {
      if (entry.isFile) {
        const file = await getFile(entry as FileSystemFileEntry);
        files.push(file);
      } else if (entry.isDirectory) {
        const subFiles = await getAllFilesFromDirectory(
          entry as FileSystemDirectoryEntry
        );
        files.push(...subFiles);
      }
    }

    return files;
  };

  // Handle file drop
  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      setError(null);

      const items = Array.from(e.dataTransfer.items);
      const allFiles: File[] = [];

      for (const item of items) {
        if (item.kind === "file") {
          const entry = item.webkitGetAsEntry();
          if (entry) {
            if (entry.isDirectory) {
              const files = await getAllFilesFromDirectory(
                entry as FileSystemDirectoryEntry
              );
              allFiles.push(...files);
            } else {
              const file = item.getAsFile();
              if (file) allFiles.push(file);
            }
          }
        }
      }

      if (allFiles.length === 0) {
        return;
      }

      // Check if too many files are dropped
      if (allFiles.length > maxFiles) {
        setError(`Too many files. Maximum allowed: ${maxFiles}`);
        return;
      }

      // Validate files
      const validFiles = allFiles.filter((file) => {
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
          
          // Reset the file input value so the same files can be selected again
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }
      }
    },
    [onFilesAccepted, maxFiles, error]
  );
  
  // Handle click to open file selector
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      ref={dropZoneRef}
      className={`relative border-2 ${
        isDragging
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
          : "border-dashed border-gray-300 dark:border-gray-700"
      } rounded-lg transition-colors ${compact ? "p-3" : "p-8"} ${className}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileInputChange}
        multiple
        tabIndex={-1}
      />

      {compact ? (
        <div className="flex items-center justify-center text-center">
          <Icon type="upload" className="w-6 h-6 mr-2 text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Drop files here or click to upload
          </span>
        </div>
      ) : (
        <EmptyState
          title="Click to upload or drag and drop"
          description={`Drop up to ${maxFiles} text files or folders`}
        />
      )}

      {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
    </div>
  );
};

export default FileDropZone;
