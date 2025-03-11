"use client";

import { useState, useCallback, useEffect } from "react";
import FileService, { FileData } from "./FileService";

// Storage key for files
const STORED_FILES_KEY = "textExtractor_files";

/**
 * Custom hook for handling file operations
 */
export function useFileManagement() {
  const [files, setFiles] = useState<FileData[]>(() => {
    // Initialize files from localStorage if available
    if (typeof window !== "undefined") {
      const storedFiles = localStorage.getItem(STORED_FILES_KEY);
      return storedFiles ? JSON.parse(storedFiles) : [];
    }
    return [];
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState({
    processed: 0,
    total: 0,
  });
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  // Persist files to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORED_FILES_KEY, JSON.stringify(files));
    }
  }, [files]);

  /**
   * Process files and update state
   */
  const processFiles = useCallback(async (rawFiles: File[]) => {
    if (!rawFiles.length) return;

    setIsProcessing(true);
    setProcessingProgress({ processed: 0, total: rawFiles.length });

    try {
      const processedFiles = await FileService.processTextFiles(
        rawFiles,
        (processed, total) => {
          setProcessingProgress({ processed, total });
        }
      );

      setFiles((prevFiles) => {
        // Create a map of existing files for quick lookup
        const existingFiles = new Map(
          prevFiles.map((file) => [file.name, file])
        );

        // Merge new files with existing ones, overwriting duplicates
        processedFiles.forEach((file) => {
          existingFiles.set(file.name, file);
        });

        return Array.from(existingFiles.values());
      });

      showNotification(
        `Processed ${rawFiles.length} file(s) successfully`,
        "success"
      );
    } catch (error) {
      console.error("Error processing files:", error);
      showNotification("Error processing files", "error");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  /**
   * Copy a specific file's content to clipboard
   */
  const copyFileContent = useCallback(
    async (text: string, fileName: string) => {
      try {
        await FileService.copyToClipboard(text);
        showNotification(`Copied ${fileName}`, "success");
      } catch (error) {
        showNotification("Failed to copy to clipboard", "error");
      }
    },
    []
  );

  /**
   * Copy all files' content to clipboard
   */
  const copyAllFiles = useCallback(async () => {
    if (!files.length) return;

    try {
      const allText = files
        .map((file) => `--- ${file.name} ---\n${file.text}`)
        .join("\n\n");

      await FileService.copyToClipboard(allText);
      showNotification("Copied all files", "success");
    } catch (error) {
      showNotification("Failed to copy to clipboard", "error");
    }
  }, [files]);

  /**
   * Show a notification message
   */
  const showNotification = useCallback(
    (message: string, type: "success" | "error" | "info" = "info") => {
      setNotification({ message, type });

      // Auto-hide notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    },
    []
  );

  /**
   * Clear notification
   */
  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  /**
   * Remove a file by name
   */
  const removeFile = useCallback((fileName: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
    showNotification(`Removed ${fileName}`, "info");
  }, []);

  /**
   * Clear all files
   */
  const clearAllFiles = useCallback(() => {
    setFiles([]);
    showNotification("All files cleared", "info");
  }, []);

  return {
    files,
    isProcessing,
    processingProgress,
    notification,
    processFiles,
    copyFileContent,
    copyAllFiles,
    clearNotification,
    removeFile,
    clearAllFiles,
  };
}
