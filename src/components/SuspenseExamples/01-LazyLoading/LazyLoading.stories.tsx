import type { Meta, StoryObj } from '@storybook/react';
import { LazyLoadingExample } from './LazyLoadingExample';

const meta: Meta<typeof LazyLoadingExample> = {
  title: 'Suspense Examples/01 - Lazy Loading',
  component: LazyLoadingExample,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Lazy Loading with React Suspense

This example demonstrates code splitting using React.lazy() and Suspense.

### Use Case
- Split large components to reduce initial bundle size
- Load components on-demand when user needs them
- Improve initial page load performance

### Key Features
- \`React.lazy()\` for dynamic imports
- \`Suspense\` boundary with loading fallback
- User-triggered lazy loading
- Automatic code splitting

### When to Use
- Large component libraries (charts, editors, etc.)
- Route-based code splitting
- Modal/dialog content
- Tabs or accordion content not immediately visible
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LazyLoadingExample>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { Suspense, lazy, useState } from 'react';
import { LoadingSpinner } from '../shared/LoadingSpinner';

// Lazy load the heavy component
const HeavyComponent = lazy(() =>
  import('./HeavyComponent').then(module => {
    // Artificial delay to demonstrate loading state
    return new Promise(resolve => {
      setTimeout(() => resolve(module), 1500);
    });
  })
);

/**
 * Example 1: Basic Lazy Loading with Suspense
 *
 * Demonstrates:
 * - React.lazy() for code splitting
 * - Suspense boundary with fallback
 * - User-triggered lazy loading
 */
export const LazyLoadingExample: React.FC = () => {
  const [showHeavyComponent, setShowHeavyComponent] = useState(false);

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h2 style={{ marginTop: 0 }}>Lazy Loading with Suspense</h2>
      <p style={{ color: '#6b7280' }}>
        Click the button to lazy load a component. The component's code will only
        be downloaded when you click the button.
      </p>

      <button
        onClick={() => setShowHeavyComponent(true)}
        disabled={showHeavyComponent}
        style={{
          padding: '10px 20px',
          backgroundColor: showHeavyComponent ? '#9ca3af' : '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: showHeavyComponent ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          fontWeight: 500
        }}
      >
        {showHeavyComponent ? 'Component Loaded' : 'Load Heavy Component'}
      </button>

      {showHeavyComponent && (
        <Suspense fallback={<LoadingSpinner message="Loading heavy component..." />}>
          <HeavyComponent />
        </Suspense>
      )}

      <div style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#f3f4f6',
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <strong>💡 Key Concepts:</strong>
        <ul style={{ margin: '10px 0 0 0', paddingLeft: '20px' }}>
          <li>React.lazy() creates a lazy-loaded component</li>
          <li>Suspense provides a fallback UI while loading</li>
          <li>Code splitting reduces initial bundle size</li>
          <li>Component loads only when needed</li>
        </ul>
      </div>
    </div>
  );
};`,
        language: 'tsx',
      },
    },
  },
};
