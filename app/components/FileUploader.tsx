import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { formatSize } from '~/lib/utils';

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
}

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      setSelectedFile(file);
      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: MAX_FILE_SIZE,
  });

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedFile(null);
    onFileSelect?.(null);
  };

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="space-y-4 cursor-pointer">
          {selectedFile ? (
            <div
  className="uploader-selected-file flex items-center space-x-3"
  onClick={(e) => e.stopPropagation()}
>
  <img src="/images/pdf.png" alt="pdf" className="size-10" />
  
  <div className="ml-auto text-right">
    <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
      {selectedFile.name}
    </p>
    <p className="text-sm text-gray-500">{formatSize(selectedFile.size)}</p>
  </div>

  <button
    type="button"
    className="p-2 cursor-pointer"
    onClick={handleRemoveFile}
  >
    <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
  </button>
</div>

          ) : (
            <div className="text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                <img src="/icons/info.svg" alt="upload" className="size-20" />
              </div>
              <p className="text-lg text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-lg text-gray-500">
                PDF (max {formatSize(MAX_FILE_SIZE)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
