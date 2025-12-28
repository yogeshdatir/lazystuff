import React from 'react';

/**
 * A "heavy" component that we want to lazy load
 */
export const HeavyComponent: React.FC = () => {
  return (
    <div className="p-5 border-2 border-green-500 rounded-lg mt-2.5">
      <h3 className="text-lg font-bold">✓ Heavy Component Loaded!</h3>
      <p>This was lazy loaded with React.lazy() and Suspense.</p>
    </div>
  );
};

export default HeavyComponent;
