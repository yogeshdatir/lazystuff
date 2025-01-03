export interface FileUploadProps {
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  disabled?: boolean;
  onFilesSelected?: (files: File[]) => void;
  onError?: (errors: Array<{ name: string; error: string }>) => void;
}

export interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  error: string | null;
}
