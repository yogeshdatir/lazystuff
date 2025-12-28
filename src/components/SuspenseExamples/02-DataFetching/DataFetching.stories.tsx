import type { Meta, StoryObj } from '@storybook/react';
import { DataFetchingExample } from './DataFetchingExample';

const meta: Meta<typeof DataFetchingExample> = {
  title: 'Suspense Examples/02 - Data Fetching',
  component: DataFetchingExample,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Data Fetching with React Suspense

This example demonstrates using Suspense with React Query for asynchronous data fetching from a real API.

### Use Case
- Fetch data from APIs
- Show loading states declaratively
- Simplify async state management
- Avoid loading state boilerplate

### Key Features
- Uses \`useSuspenseQuery\` from React Query
- Fetches from JSONPlaceholder public API
- Automatic loading state handling
- Component suspends while data loads

### How It Works
1. \`useSuspenseQuery\` initiates the fetch
2. While loading, component suspends (throws promise)
3. Suspense catches it and shows fallback UI
4. When data arrives, component re-renders
5. React Query handles caching automatically

### When to Use
- API data fetching
- Async operations that affect rendering
- When you want automatic caching and refetching
- Production-ready data fetching patterns
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataFetchingExample>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { Suspense, useState } from 'react';
import { QueryClient, QueryClientProvider, useSuspenseQuery } from '@tanstack/react-query';

interface User {
  id: number;
  name: string;
  email: string;
}

const queryClient = new QueryClient();

// Fetch from JSONPlaceholder public API
async function fetchUsers(): Promise<User[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
}

// Component that uses Suspense query
const UserList: React.FC = () => {
  const { data: users } = useSuspenseQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  return (
    <div className="mt-2.5 border border-gray-300 rounded">
      <div className="p-2.5 bg-gray-100 font-bold">
        Users ({users.length})
      </div>
      {users.map(user => (
        <div key={user.id} className="p-2.5 border-t border-gray-200">
          <div className="font-bold">{user.name}</div>
          <div className="text-sm text-gray-600">{user.email}</div>
        </div>
      ))}
    </div>
  );
};

export const DataFetchingExample: React.FC = () => {
  const [show, setShow] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-5 max-w-2xl">
        <h2 className="text-2xl font-bold mb-2">Data Fetching with Suspense</h2>

        <button
          onClick={() => setShow(true)}
          className="px-5 py-2.5 bg-blue-500 text-white rounded-md cursor-pointer font-medium text-base hover:bg-blue-600"
        >
          Fetch Users
        </button>

        {show && (
          <Suspense fallback={<div className="mt-2">Loading users...</div>}>
            <UserList />
          </Suspense>
        )}
      </div>
    </QueryClientProvider>
  );
};`,
        language: 'tsx',
      },
    },
  },
};
