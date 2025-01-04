import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './FileUpload';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file selection',
    },
    accept: {
      control: 'text',
      description: 'Accepted file types (e.g., ".jpg,.png,.pdf")',
    },
    maxSize: {
      control: 'number',
      description: 'Maximum file size in bytes',
    },
    maxFiles: {
      control: 'number',
      description: 'Maximum number of files allowed',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the upload component',
    },
    onFilesSelected: {
      description: 'Callback function when files are selected',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

// Basic usage
export const Default: Story = {
  args: {
    onFilesSelected: action('files-selected'),
  },
};

// Multiple file upload
export const MultipleFiles: Story = {
  args: {
    multiple: true,
    maxFiles: 5,
    onFilesSelected: action('files-selected'),
  },
};

// Image upload only
export const ImageUpload: Story = {
  args: {
    accept: 'image/*',
    multiple: true,
    onFilesSelected: action('files-selected'),
    required: true,
    onError: (errors) => {
      console.log(errors);
    },
  },
};

// PDF upload only
export const PDFUpload: Story = {
  args: {
    accept: '.pdf',
    multiple: false,
    onFilesSelected: action('files-selected'),
  },
};

// Small file size limit
export const SmallSizeLimit: Story = {
  args: {
    maxSize: 1024 * 1024, // 1MB
    multiple: true,
    onFilesSelected: action('files-selected'),
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    disabled: true,
    onFilesSelected: action('files-selected'),
  },
};

// Maximum files limit
export const MaxFilesLimit: Story = {
  args: {
    multiple: true,
    maxFiles: 3,
    onFilesSelected: action('files-selected'),
  },
};

// Custom styling example
export const CustomStyling: Story = {
  args: {
    multiple: true,
    onFilesSelected: action('files-selected'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with custom styling applied through CSS.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithErrorHandling: Story = {
  args: {
    accept: '.jpg,.png',
    multiple: true,
    maxSize: 1024 * 1024, // 1MB
    onFilesSelected: action('files-selected'),
    onError: action('file-errors'),
  },
};
