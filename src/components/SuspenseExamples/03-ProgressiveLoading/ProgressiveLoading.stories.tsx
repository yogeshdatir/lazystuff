import type { Meta, StoryObj } from '@storybook/react';
import { ProgressiveLoadingExample } from './ProgressiveLoadingExample';

const meta: Meta<typeof ProgressiveLoadingExample> = {
  title: 'Suspense Examples/03 - Progressive Loading',
  component: ProgressiveLoadingExample,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Progressive Loading with Multiple Suspense Boundaries

This example demonstrates progressive loading using **multiple independent Suspense boundaries** (not nested).

### Use Case
- Dashboard with multiple data sources
- Different loading speeds for different content
- Show important content first
- Improve perceived performance

### Key Features
- **Independent** Suspense boundaries (siblings, not nested)
- Progressive content rendering
- Granular loading states
- Better UX with faster initial content

### Loading Order
1. **Profile** (1s) - Shows first
2. **Posts** (2s) - Shows second
3. **Comments** (3s) - Shows last

### Important: Not True Nesting
These are **separate/sibling** Suspense boundaries:
\`\`\`tsx
<div>
  <Suspense><Profile /></Suspense>    // Independent
  <Suspense><Posts /></Suspense>      // Independent
  <Suspense><Comments /></Suspense>   // Independent
</div>
\`\`\`

**True nesting** would look like:
\`\`\`tsx
<Suspense>
  <Profile />
  <Suspense>
    <Posts />
    <Suspense>
      <Comments />
    </Suspense>
  </Suspense>
</Suspense>
\`\`\`

### Benefits
- Users see content as it becomes available
- Faster perceived load time
- No "all or nothing" loading
- More responsive feel

### When to Use
- Complex dashboards
- Multi-section pages
- Different data sources with varying speeds
- When some content is more important than others
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProgressiveLoadingExample>;

const sourceCode = `import React, { Suspense, useState } from 'react';
import { QueryClient, QueryClientProvider, useSuspenseQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

// Fetch from JSONPlaceholder API with delays
async function fetchUser(): Promise<User> {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Fast - 1s
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  return response.json();
}

async function fetchPosts(): Promise<Post[]> {
  await new Promise(resolve => setTimeout(resolve, 2000)); // Medium - 2s
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
  return response.json();
}

async function fetchTodos(): Promise<Todo[]> {
  await new Promise(resolve => setTimeout(resolve, 3000)); // Slow - 3s
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=3');
  return response.json();
}

// Components that use Suspense queries
const Profile: React.FC = () => {
  const { data } = useSuspenseQuery({ queryKey: ['user'], queryFn: fetchUser });
  return (
    <div className="p-2.5 border border-gray-300 my-2.5 rounded">
      <strong>{data.name}</strong> - @{data.username}
    </div>
  );
};

const Posts: React.FC = () => {
  const { data } = useSuspenseQuery({ queryKey: ['posts'], queryFn: fetchPosts });
  return (
    <div className="p-2.5 border border-gray-300 my-2.5 rounded">
      <strong>Posts:</strong> {data.map(p => p.title.slice(0, 20)).join(', ')}...
    </div>
  );
};

const Todos: React.FC = () => {
  const { data } = useSuspenseQuery({ queryKey: ['todos'], queryFn: fetchTodos });
  return (
    <div className="p-2.5 border border-gray-300 my-2.5 rounded">
      <strong>Todos:</strong> {data.map(t => t.title.slice(0, 15)).join(', ')}...
    </div>
  );
};

export const ProgressiveLoadingExample: React.FC = () => {
  const [show, setShow] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-5 max-w-2xl">
        <h2 className="text-2xl font-bold mb-2">Progressive Loading</h2>
        <p className="mb-4">Watch content appear progressively: Profile (1s) → Posts (2s) → Todos (3s)</p>

        <button
          onClick={() => setShow(true)}
          className="px-5 py-2.5 bg-blue-500 text-white rounded-md cursor-pointer font-medium text-base hover:bg-blue-600"
        >
          Load Dashboard
        </button>

        {show && (
          <div>
            {/* Independent Suspense boundaries - each loads separately */}
            <Suspense fallback={<div className="mt-2">Loading profile...</div>}>
              <Profile />
            </Suspense>

            <Suspense fallback={<div className="mt-2">Loading posts...</div>}>
              <Posts />
            </Suspense>

            <Suspense fallback={<div className="mt-2">Loading todos...</div>}>
              <Todos />
            </Suspense>
          </div>
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
