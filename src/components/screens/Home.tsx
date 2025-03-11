"use client";

import { useCallback } from "react";
import Image from "next/image";
import { motion } from "motion/react";

// Import components
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import FileDropZone from "../organisms/FileDropZone";
import FileList from "../organisms/FileList";
import NotificationToast from "../molecules/NotificationToast";
import ProcessingIndicator from "../molecules/ProcessingIndicator";

// Import hooks and services
import { useFileManagement } from "../../hooks/useFileManagement";

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

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center min-h-screen p-8 gap-8 font-[family-name:var(--font-geist-sans)]">
      <Header title="Text File Extractor" />

      <main className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-2">
            Extract Text from Files
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Drop your text files below to extract and view their contents
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <FileDropZone
            onFilesAccepted={handleFilesAccepted}
            className="h-64 w-full"
            validationOptions={{ maxFiles: 20 }}
          />
        </motion.div>

        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ProcessingIndicator
              processed={processingProgress.processed}
              total={processingProgress.total}
              className="mt-4"
            />
          </motion.div>
        )}

        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FileList
              files={files}
              onCopyFile={copyFileContent}
              onCopyAll={copyAllFiles}
              onRemoveFile={removeFile}
              onClearAll={clearAllFiles}
            />
          </motion.div>
        )}
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
