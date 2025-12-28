import React, { Suspense, lazy, useState } from 'react';

// Lazy load the heavy component
const HeavyComponent = lazy(() =>
  import('./HeavyComponent').then(module => {
    // Artificial delay to see loading state
    return new Promise(resolve => setTimeout(() => resolve(module), 1500));
  })
);

export const LazyLoadingExample: React.FC = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="p-5 max-w-2xl">
      <h2 className="text-2xl font-bold mb-2">Lazy Loading with Suspense</h2>

      <button
        onClick={() => setShow(true)}
        disabled={show}
        className={`px-5 py-2.5 text-white rounded-md font-medium text-base ${
          show
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
        }`}
      >
        Load Heavy Component
      </button>

      {show && (
        <Suspense fallback={<div className="mt-2">Loading component...</div>}>
          <HeavyComponent />
        </Suspense>
      )}
    </div>
  );
};
