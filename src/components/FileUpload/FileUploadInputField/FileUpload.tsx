import React, { useCallback, useState } from 'react';
import { FileUploadProps, UploadedFile } from './types';
import './FileUpload.css';

export const FileUpload: React.FC<FileUploadProps> = ({
  multiple = false,
  accept,
  maxSize = 5242880, // 5MB default
  onFilesSelected,
  onError, 
  maxFiles = 10,
  disabled = false,
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const validateFileType = (file: File, accept?: string): boolean => {
    if (!accept) return true;
    
    // Convert accept string to array of valid types
    const acceptedTypes = accept.split(',').map(type => type.trim().toLowerCase());
    
    // Get file extension
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    
    // Check if file type matches any accepted type
    return acceptedTypes.some(type => {
      // Check file extension
      if (type.startsWith('.')) {
        return fileExtension === type;
      }
      // Check MIME type
      return file.type.toLowerCase().match(type.replace('*', '.*'));
    });
  };
  
  const handleFileSelection = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
  
    const newFiles: UploadedFile[] = Array.from(selectedFiles).map(file => {
      const fileData: UploadedFile = {
        id: `${file.name}-${Date.now()}`,
        file,
        progress: 0,
        error: null
      };
  
      // Always validate file type regardless of existing files
      if (accept && !validateFileType(file, accept)) {
        fileData.error = `Invalid file type. Accepted types: ${accept}`;
        return fileData;
      }
  
      // Validate file size
      if (file.size > maxSize) {
        fileData.error = `File is too large. Maximum size: ${(maxSize / 1024 / 1024).toFixed(1)}MB`;
        return fileData;
      }
  
      return fileData;
    });
  
    const validFiles = newFiles.filter(file => !file.error);
    const invalidFiles = newFiles.filter(file => file.error);
  
    // Check total files limit only for valid files
    const totalValidFiles = files.filter(f => !f.error).length + validFiles.length;
    if (totalValidFiles > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }
  
    // Add all files to state (both valid and invalid)
    setFiles(prev => [...prev, ...newFiles]);
    
    // Notify parent component about valid files
    if (validFiles.length > 0) {
      onFilesSelected?.(validFiles.map(f => f.file));
    }
    
    // Notify about invalid files
    if (invalidFiles.length > 0 && onError) {
      onError(invalidFiles.map(f => ({
        name: f.file.name,
        error: f.error as string
      })));
    }
  }, [accept, maxSize, maxFiles, files, onFilesSelected, onError]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFileSelection(e.dataTransfer.files);
    },
    [handleFileSelection]
  );

  const removeFile = useCallback((fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  }, []);

  return (
    <div className="file-upload-container">
      <div
        className={`file-upload-area ${isDragging ? 'dragging' : ''} ${disabled ? 'disabled' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          onChange={(e) => handleFileSelection(e.target.files)}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="file-input"
        />
        <div className="upload-message">
          <p>Drag and drop files here or click to select</p>
          <p className="file-types">{accept || 'All files accepted'}</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="file-list">
          {files.map(file => (
            <div 
              key={file.id} 
              className={`file-item ${file.error ? 'error' : ''}`}
            >
              <span className="file-name">{file.file.name}</span>
              <span className="file-size">
                {(file.file.size / 1024 / 1024).toFixed(2)} MB
              </span>
              {file.error && (
                <span className="file-error" title={file.error}>
                  {file.error}
                </span>
              )}
              <button
                className="remove-file"
                onClick={() => removeFile(file.id)}
                disabled={disabled}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
