import React, { useCallback, useState } from 'react';
import { useDropzone, FileRejection, Accept } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, File as FileIcon, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { formatBytes } from '@/lib/utils';

interface UploadBoxProps {
  onFilesAccepted: (files: File[]) => void;
  acceptedFormats?: Accept;
  maxSize?: number; // in bytes
  maxFiles?: number;
  multiple?: boolean;
  className?: string;
  prompt?: {
    title?: string;
    description?: string;
  };
}

export const UploadBox = ({
  onFilesAccepted,
  acceptedFormats = {},
  maxSize = 50 * 1024 * 1024, // 50MB default
  maxFiles = 1,
  multiple = false,
  className,
  prompt,
}: UploadBoxProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    setError(null);
    if (fileRejections.length > 0) {
      const firstRejection = fileRejections[0];
      const firstError = firstRejection.errors[0];
      if (firstError.code === 'file-too-large') {
        setError(`File is too large. Maximum size is ${formatBytes(maxSize)}.`);
      } else if (firstError.code === 'file-invalid-type') {
        setError('Invalid file type.');
      } else if (firstError.code === 'too-many-files') {
        setError(`You can only upload a maximum of ${maxFiles} files.`);
      } else {
        setError(firstError.message);
      }
      setFiles([]);
      onFilesAccepted([]);
    } else if (acceptedFiles.length > 0) {
      setFiles(acceptedFiles);
      onFilesAccepted(acceptedFiles);
    }
  }, [maxSize, maxFiles, onFilesAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFormats,
    maxSize,
    maxFiles,
    multiple,
  });

  const removeFile = (fileToRemove: File) => {
    const newFiles = files.filter(file => file !== fileToRemove);
    setFiles(newFiles);
    onFilesAccepted(newFiles);
  };

  const clearAll = () => {
    setFiles([]);
    onFilesAccepted([]);
  }

  return (
    <div className={cn('w-full space-y-4', className)}>
      {files.length === 0 ? (
        <div
          {...getRootProps()}
          className={cn(
            'relative w-full p-8 text-center transition-all duration-300 ease-in-out',
            'rounded-2xl border-2 border-dashed border-border bg-secondary/20 backdrop-blur-lg',
            'hover:border-primary hover:bg-secondary/40 cursor-pointer',
            isDragActive && 'border-primary bg-primary/10'
          )}
        >
          <input {...getInputProps()} />
          <motion.div
            className="flex flex-col items-center justify-center"
            animate={{ scale: isDragActive ? 1.1 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <UploadCloud className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="font-semibold text-foreground">{prompt?.title || 'Click or drag & drop to upload'}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {prompt?.description || `Max file size: ${formatBytes(maxSize)}`}
            </p>
          </motion.div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <AnimatePresence>
              {files.map((file, index) => (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="relative group aspect-square rounded-lg border bg-card overflow-hidden"
                >
                  {file.type.startsWith('image/') ? (
                    <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full p-2 text-center">
                      <FileIcon className="h-8 w-8 text-muted-foreground" />
                      <p className="text-xs font-medium truncate w-full mt-2">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
                    </div>
                  )}
                  <button
                    onClick={() => removeFile(file)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="flex justify-center gap-4">
            <Button onClick={clearAll} variant="destructive">Clear All</Button>
            {multiple && (
              <Button variant="outline" onClick={() => document.querySelector('input[type="file"]')?.click()}>Add More Files</Button>
            )}
          </div>
        </div>
      )}
      {error && <p className="text-sm text-destructive text-center">{error}</p>}
    </div>
  );
};