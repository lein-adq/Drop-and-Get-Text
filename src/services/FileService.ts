"use client";

// Define types
export interface FileData {
  name: string;
  text: string;
}

/**
 * Service for handling text file operations
 */
export class FileService {
  /**
   * Read a file as text
   * @param file - File to read
   * @returns Promise that resolves with the file content
   */
  static readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result as string);
        } else {
          reject(new Error("Failed to read file content"));
        }
      };

      reader.onerror = () => {
        reject(new Error("Error reading file"));
      };

      reader.readAsText(file);
    });
  }

  /**
   * Process multiple files and read their content as text
   * @param files - Array of files to process
   * @param onProgress - Optional callback for progress updates
   * @returns Promise that resolves with an array of FileData objects
   */
  static async processTextFiles(
    files: File[],
    onProgress?: (processed: number, total: number) => void
  ): Promise<FileData[]> {
    const fileData: FileData[] = [];
    let processed = 0;

    for (const file of files) {
      try {
        const text = await this.readFileAsText(file);
        fileData.push({ name: file.name, text });
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
        // Still add the file to the array but with empty text
        fileData.push({ name: file.name, text: "" });
      }

      processed++;
      if (onProgress) {
        onProgress(processed, files.length);
      }
    }

    return fileData;
  }

  /**
   * Copy text to clipboard
   * @param text - Text to copy
   * @returns Promise that resolves when the text has been copied
   */
  static async copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("Failed to copy text:", error);
      throw new Error("Failed to copy to clipboard");
    }
  }
}

export default FileService;
