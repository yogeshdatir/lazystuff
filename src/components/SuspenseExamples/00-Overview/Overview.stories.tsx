import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const OverviewComponent: React.FC = () => {
  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '20px', color: '#111827' }}>
        React Suspense Examples
      </h1>

      <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '30px' }}>
        Welcome to the React Suspense examples collection! This is a comprehensive guide to various Suspense use cases and patterns.
      </p>

      <div style={{ backgroundColor: '#f0f9ff', padding: '20px', borderRadius: '8px', marginBottom: '40px', borderLeft: '4px solid #3b82f6' }}>
        <h2 style={{ fontSize: '20px', marginTop: 0, color: '#1e40af' }}>What is React Suspense?</h2>
        <p style={{ color: '#1e3a8a', marginBottom: '15px' }}>
          React Suspense is a feature that lets components "wait" for something before rendering.
          It provides a declarative way to handle asynchronous operations and loading states.
        </p>

        <h3 style={{ fontSize: '16px', marginBottom: '10px', color: '#1e40af' }}>Key Benefits:</h3>
        <ul style={{ color: '#1e3a8a', marginLeft: '20px' }}>
          <li><strong>Declarative Loading States</strong> - No more isLoading boolean flags</li>
          <li><strong>Better UX</strong> - Coordinate loading states across components</li>
          <li><strong>Code Splitting</strong> - Load components only when needed</li>
          <li><strong>Concurrent Rendering</strong> - Keep UI responsive during updates</li>
          <li><strong>Cleaner Code</strong> - Less boilerplate for async operations</li>
        </ul>
      </div>

      <h2 style={{ fontSize: '28px', marginBottom: '25px', color: '#111827' }}>
        Examples in This Collection
      </h2>

      <div style={{ display: 'grid', gap: '20px' }}>
        {/* Example 1 */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', backgroundColor: '#ffffff' }}>
          <h3 style={{ fontSize: '20px', marginTop: 0, color: '#059669' }}>
            🚀 01 - Lazy Loading
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '10px' }}>
            Learn how to use <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>React.lazy()</code> and
            Suspense for code splitting. Perfect for reducing initial bundle size.
          </p>
          <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>
            <strong>Key Concepts:</strong> Dynamic imports, code splitting, on-demand loading
          </p>
        </div>

        {/* Example 2 */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', backgroundColor: '#ffffff' }}>
          <h3 style={{ fontSize: '20px', marginTop: 0, color: '#059669' }}>
            📡 02 - Data Fetching
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '10px' }}>
            Fetch data with Suspense using the resource pattern. Eliminates loading state boilerplate.
          </p>
          <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>
            <strong>Key Concepts:</strong> Suspense resources, async data loading, declarative patterns
          </p>
        </div>

        {/* Example 3 */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', backgroundColor: '#ffffff' }}>
          <h3 style={{ fontSize: '20px', marginTop: 0, color: '#059669' }}>
            🔄 03 - Progressive Loading
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '10px' }}>
            Multiple independent Suspense boundaries for progressive loading. Show fast content first, slow content later.
          </p>
          <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>
            <strong>Key Concepts:</strong> Progressive loading, independent boundaries, improved perceived performance
          </p>
        </div>

        {/* Example 4 */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', backgroundColor: '#ffffff' }}>
          <h3 style={{ fontSize: '20px', marginTop: 0, color: '#059669' }}>
            ⚠️ 04 - Error Handling
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '10px' }}>
            Combine Error Boundaries with Suspense for complete async state management.
          </p>
          <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>
            <strong>Key Concepts:</strong> Error boundaries, retry mechanisms, graceful degradation
          </p>
        </div>

        {/* Example 5 */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', backgroundColor: '#ffffff' }}>
          <h3 style={{ fontSize: '20px', marginTop: 0, color: '#059669' }}>
            ⚡ 05 - Concurrent Rendering
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '10px' }}>
            Use <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>useTransition</code> for
            smooth, non-blocking UI updates. Keep UI responsive during Suspense.
          </p>
          <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>
            <strong>Key Concepts:</strong> useTransition, concurrent rendering, non-blocking updates
          </p>
        </div>

        {/* Example 6 */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', backgroundColor: '#ffffff' }}>
          <h3 style={{ fontSize: '20px', marginTop: 0, color: '#059669' }}>
            🖼️ 06 - Image Lazy Loading
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '10px' }}>
            Progressive image loading with Suspense. No more broken image icons or layout shifts.
          </p>
          <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>
            <strong>Key Concepts:</strong> Image resources, preventing layout shift, progressive enhancement
          </p>
        </div>
      </div>

      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#ecfdf5', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
        <h3 style={{ fontSize: '18px', marginTop: 0, color: '#065f46' }}>Quick Start</h3>
        <p style={{ color: '#047857', marginBottom: '15px' }}>
          Each example is self-contained with:
        </p>
        <ul style={{ color: '#047857', marginLeft: '20px', marginBottom: 0 }}>
          <li>✅ Working code you can copy</li>
          <li>✅ Interactive demo</li>
          <li>✅ Detailed explanations</li>
          <li>✅ Use case descriptions</li>
          <li>✅ Best practices</li>
        </ul>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '18px', marginTop: 0, color: '#374151' }}>Common Patterns Reference</h3>

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '16px', color: '#1f2937', marginBottom: '8px' }}>Basic Pattern</h4>
          <pre style={{
            backgroundColor: '#1f2937',
            color: '#f3f4f6',
            padding: '15px',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '14px',
            margin: 0
          }}>
{`import { Suspense, lazy } from 'react';

const Component = lazy(() => import('./Component'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
}`}
          </pre>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '16px', color: '#1f2937', marginBottom: '8px' }}>With Error Boundary</h4>
          <pre style={{
            backgroundColor: '#1f2937',
            color: '#f3f4f6',
            padding: '15px',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '14px',
            margin: 0
          }}>
{`<ErrorBoundary fallback={<ErrorUI />}>
  <Suspense fallback={<LoadingUI />}>
    <AsyncComponent />
  </Suspense>
</ErrorBoundary>`}
          </pre>
        </div>

        <div>
          <h4 style={{ fontSize: '16px', color: '#1f2937', marginBottom: '8px' }}>With Transition</h4>
          <pre style={{
            backgroundColor: '#1f2937',
            color: '#f3f4f6',
            padding: '15px',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '14px',
            margin: 0
          }}>
{`const [isPending, startTransition] = useTransition();

const handleClick = () => {
  startTransition(() => {
    setResource(fetchResource());
  });
};`}
          </pre>
        </div>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#fff7ed', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
        <h3 style={{ fontSize: '18px', marginTop: 0, color: '#92400e' }}>Best Practices</h3>
        <ol style={{ color: '#78350f', marginLeft: '20px', marginBottom: 0 }}>
          <li><strong>Always wrap Suspense with Error Boundary</strong> in production</li>
          <li><strong>Use meaningful fallbacks</strong> - skeleton screens work great</li>
          <li><strong>Nest boundaries</strong> for progressive loading</li>
          <li><strong>Use transitions</strong> for user-initiated updates</li>
          <li><strong>Reserve space</strong> to prevent layout shift</li>
        </ol>
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center', padding: '30px', backgroundColor: '#fef3c7', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '24px', marginTop: 0, color: '#78350f' }}>
          Happy Learning! 🎉
        </h2>
        <p style={{ color: '#92400e', margin: 0 }}>
          Navigate through the examples using the sidebar to see Suspense in action!
        </p>
      </div>
    </div>
  );
};

const meta: Meta<typeof OverviewComponent> = {
  title: 'Suspense Examples/00 - Overview',
  component: OverviewComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# React Suspense Examples Overview

A comprehensive collection of React Suspense patterns and use cases.

## Technologies Used
- React 18.2.0
- TypeScript
- Storybook 8.4.7
- Modern JavaScript (ES6+)

## Getting Started
Navigate through the numbered examples (01-06) in the sidebar to explore different Suspense use cases.
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OverviewComponent>;

export const Overview: Story = {};
