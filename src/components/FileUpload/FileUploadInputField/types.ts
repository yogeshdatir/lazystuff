export type FileUploadProps = {
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  onFilesSelected?: (files: File[]) => void;
  onError?: (errors: Array<{ name: string; error: string }>) => void;
  maxFiles?: number;
  disabled?: boolean;
  required?: boolean;
};

export interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  error: string | null;
}
