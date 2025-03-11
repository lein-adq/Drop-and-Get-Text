import React, { useCallback, useState } from "react";
import { motion } from "motion/react";

// Import components
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import FileDropZone from "../organisms/FileDropZone";
import FileContent from "../organisms/FileContent";
import NotificationToast from "../molecules/NotificationToast";
import ProcessingIndicator from "../molecules/ProcessingIndicator";
import Sidebar from "../organisms/Sidebar";

// Import hooks and services
import { useFileManagement } from "../../hooks/useFileManagement";
import EmptyState from "../molecules/EmptyState";

const Home: React.FC = () => {
  const {
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
  } = useFileManagement();

  const [activeFileIndex, setActiveFileIndex] = useState(0);

  const handleFilesAccepted = useCallback(
    (acceptedFiles: File[]) => {
      processFiles(acceptedFiles);
    },
    [processFiles]
  );

  // Footer links
  const footerLinks = [
    {
      label: "Learn",
      href: "https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app",
      icon: "/file.svg",
      iconAlt: "File icon",
    },
    {
      label: "Examples",
      href: "https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app",
      icon: "/window.svg",
      iconAlt: "Window icon",
    },
    {
      label: "Go to nextjs.org →",
      href: "https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app",
      icon: "/globe.svg",
      iconAlt: "Globe icon",
    },
  ];

  // The active file or undefined if no files
  const activeFile = files.length > 0 ? files[activeFileIndex] : undefined;

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header title="Drop and Get Text" />

      <main className="flex flex-1 overflow-hidden">
        {/* Left Sidebar with File List and Upload Zone */}
        <div className="w-[20em] border-r border-gray-200 dark:border-gray-700 flex flex-col">
          {/* File Upload Area - Always visible */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-medium mb-2">Upload Files</h2>
            <FileDropZone
              onFilesAccepted={handleFilesAccepted}
              className="h-32 w-full"
              validationOptions={{ maxFiles: 20 }}
            />
            
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <ProcessingIndicator
                  processed={processingProgress.processed}
                  total={processingProgress.total}
                  className="mt-3"
                />
              </motion.div>
            )}
          </div>
          
          {/* File list */}
          {files.length > 0 ? (
            <div className="flex-1 overflow-y-auto">
              <Sidebar
                files={files}
                activeFileIndex={activeFileIndex}
                onSelectFile={setActiveFileIndex}
                onCopyFile={copyFileContent}
                onCopyAll={copyAllFiles}
                onRemoveFile={removeFile}
                onClearAll={clearAllFiles}
              />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-4">
              <EmptyState
                icon="info"
                title="No files yet"
                description="Upload files to get started"
              />
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeFile ? (
            <FileContent
              file={activeFile}
              onCopy={() => copyFileContent(activeFile.text, activeFile.name)}
              onRemove={() => {
                if (files.length > 1) {
                  setActiveFileIndex(Math.max(0, activeFileIndex - 1));
                }
                removeFile(activeFile.name);
              }}
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <EmptyState
                icon="upload"
                title="No file selected"
                description="Upload files or select a file to view its contents"
              />
            </div>
          )}
        </div>
      </main>

      <Footer links={footerLinks} />

      {notification && (
        <NotificationToast
          message={notification.message}
          type={notification.type}
          onClose={clearNotification}
        />
      )}
    </div>
  );
};

export default Home;
