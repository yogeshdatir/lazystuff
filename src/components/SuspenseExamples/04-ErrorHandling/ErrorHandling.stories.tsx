import type { Meta, StoryObj } from '@storybook/react';
import { ErrorHandlingExample } from './ErrorHandlingExample';

const meta: Meta<typeof ErrorHandlingExample> = {
  title: 'Suspense Examples/04 - Error Handling',
  component: ErrorHandlingExample,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Error Handling with Suspense

This example demonstrates how to handle errors in Suspense components using Error Boundaries.

### Use Case
- Handle API failures gracefully
- Provide fallback UI for errors
- Implement retry mechanisms
- Catch errors during async operations

### Key Features
- Error Boundary wrapping Suspense
- Custom error fallback UI
- Retry functionality
- Clear error messaging

### Pattern
\`\`\`tsx
<ErrorBoundary fallback={<ErrorUI />}>
  <Suspense fallback={<LoadingUI />}>
    <AsyncComponent />
  </Suspense>
</ErrorBoundary>
\`\`\`

### Three States Handled
1. **Loading** - Suspense fallback shown
2. **Success** - Component renders normally
3. **Error** - Error Boundary fallback shown

### When to Use
- Any async operation that might fail
- API calls
- Resource loading
- User-initiated actions that could error
- Anywhere you need graceful error handling

### Best Practices
- Always wrap Suspense with Error Boundary
- Provide clear error messages
- Offer retry mechanisms
- Log errors for debugging
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ErrorHandlingExample>;

const sourceCode = `import React, { Suspense, useState } from 'react';
import { QueryClient, QueryClientProvider, useSuspenseQuery } from '@tanstack/react-query';
import { ErrorBoundary } from '../shared/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Don't retry on error for demo purposes
    },
  },
});

interface Post {
  id: number;
  title: string;
  body: string;
}

// Fetch that can succeed or fail
async function fetchPost(shouldFail: boolean): Promise<Post> {
  if (shouldFail) {
    throw new Error('Failed to fetch post');
  }
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  return response.json();
}

const DataDisplay: React.FC<{ shouldFail: boolean }> = ({ shouldFail }) => {
  const { data } = useSuspenseQuery({
    queryKey: ['post', shouldFail],
    queryFn: () => fetchPost(shouldFail),
  });

  return (
    <div className="p-2.5 border-2 border-green-500 mt-2.5 rounded-md">
      ✓ {data.title}
    </div>
  );
};

export const ErrorHandlingExample: React.FC = () => {
  const [mode, setMode] = useState<'success' | 'error' | null>(null);
  const [key, setKey] = useState(0);

  const load = (shouldFail: boolean) => {
    setMode(shouldFail ? 'error' : 'success');
    setKey(prev => prev + 1); // Reset ErrorBoundary
    queryClient.clear(); // Clear cache
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-5 max-w-[600px]">
        <h2 className="text-2xl font-bold mb-2">Error Handling with Suspense</h2>

        <button
          onClick={() => load(false)}
          className="px-5 py-2.5 bg-green-500 text-white rounded-md cursor-pointer text-base font-medium mr-2.5 hover:bg-green-600"
        >
          Load (Success)
        </button>
        <button
          onClick={() => load(true)}
          className="px-5 py-2.5 bg-red-500 text-white rounded-md cursor-pointer text-base font-medium hover:bg-red-600"
        >
          Load (Error)
        </button>

        {mode && (
          <ErrorBoundary
            key={key}
            fallback={
              <div className="p-4 border-2 border-red-500 mt-2.5 rounded-md bg-red-100">
                <strong className="text-red-800">Error!</strong>
                <p className="text-red-900">Something went wrong.</p>
                <button
                  onClick={() => load(false)}
                  className="px-5 py-2.5 bg-red-500 text-white rounded-md cursor-pointer text-base font-medium hover:bg-red-600"
                >
                  Try Again
                </button>
              </div>
            }
          >
            <Suspense fallback={<div>Loading...</div>}>
              <DataDisplay shouldFail={mode === 'error'} />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>
    </QueryClientProvider>
  );
};`;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: sourceCode,
        language: 'tsx',
      },
    },
  },
};
