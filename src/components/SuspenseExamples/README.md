# React Suspense Examples

A comprehensive collection of React Suspense use cases and patterns for your Storybook lab.

## Overview

This collection demonstrates various real-world use cases of React Suspense, from basic lazy loading to advanced concurrent rendering patterns. Each example is self-contained and can be used as a template for your projects.

## Examples Included

### 01 - Lazy Loading

**Use Case:** Code splitting and lazy loading components
**Key Concepts:**

- `React.lazy()` for dynamic imports
- Basic Suspense boundary
- Reducing initial bundle size
- On-demand component loading

**When to use:**

- Large component libraries (charts, editors)
- Route-based code splitting
- Modal/dialog content
- Tabs or accordion content

[View Example →](./01-LazyLoading)

---

### 02 - Data Fetching

**Use Case:** Asynchronous data loading
**Key Concepts:**

- Suspense-compatible resource pattern
- Declarative loading states
- Eliminating loading state variables
- Cleaner async logic

**When to use:**

- API data fetching
- Database queries
- Any async operation affecting render
- Replacing traditional loading states

[View Example →](./02-DataFetching)

---

### 03 - Progressive Loading

**Use Case:** Progressive loading with multiple data sources
**Key Concepts:**

- Multiple **independent** Suspense boundaries (not nested)
- Sibling boundaries with separate loading states
- Progressive content rendering
- Improved perceived performance

**When to use:**

- Dashboards with multiple widgets
- Pages with various data sources
- Different loading speeds
- Prioritizing important content

[View Example →](./03-ProgressiveLoading)

---

### 04 - Error Handling

**Use Case:** Graceful error handling in async operations
**Key Concepts:**

- Error Boundaries with Suspense
- Fallback error UI
- Retry mechanisms
- Complete async state coverage

**When to use:**

- Any async operation that might fail
- API calls with potential errors
- User-initiated actions
- Production-ready error handling

[View Example →](./04-ErrorHandling)

---

### 05 - Concurrent Rendering

**Use Case:** Smooth UI transitions with useTransition
**Key Concepts:**

- `useTransition` hook
- Non-blocking state updates
- Keeping UI responsive
- `isPending` state

**When to use:**

- Tab navigation
- Search with live results
- Filtering/sorting
- Route transitions
- Any state change that might suspend

[View Example →](./05-ConcurrentRendering)

---

### 06 - Image Lazy Loading

**Use Case:** Progressive image loading
**Key Concepts:**

- Suspense for image loading
- Preventing broken images
- Layout shift prevention
- Image resource pattern

**When to use:**

- Image galleries
- Photo viewers
- Product images
- User avatars
- High-quality images

[View Example →](./06-ImageLazyLoading)

---

## Shared Utilities

### `ErrorBoundary`

A reusable Error Boundary component for catching errors in Suspense components.

```tsx
<ErrorBoundary fallback={<ErrorUI />}>
  <Suspense fallback={<Loading />}>
    <AsyncComponent />
  </Suspense>
</ErrorBoundary>
```

### `LoadingSpinner`

A simple loading indicator component for Suspense fallbacks.

```tsx
<Suspense fallback={<LoadingSpinner message="Loading..." size="medium" />}>
  <Component />
</Suspense>
```

### `suspenseUtils`

Helper functions for creating Suspense-compatible resources:

- `wrapPromise<T>(promise)` - Wraps a promise in a Suspense-compatible resource
- `fetchData<T>(data, delay)` - Simulates async data fetching
- `fetchDataWithError<T>(data, delay, shouldFail)` - Simulates async with potential errors

---

## Running the Examples

1. Start Storybook:

   ```bash
   yarn sb
   ```

2. Navigate to "Suspense Examples" in the sidebar

3. Each example is interactive - click buttons to trigger Suspense behaviors

---

## Common Patterns

### Basic Suspense

```tsx
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

### With Error Boundary

```tsx
<ErrorBoundary fallback={<Error />}>
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
</ErrorBoundary>
```

### With useTransition

```tsx
const [isPending, startTransition] = useTransition();

const handleChange = (value) => {
  startTransition(() => {
    setState(value);
  });
};
```

### Nested Boundaries

```tsx
<Suspense fallback={<OuterLoading />}>
  <FastComponent />
  <Suspense fallback={<InnerLoading />}>
    <SlowComponent />
  </Suspense>
</Suspense>
```

---

## Best Practices

1. **Always use Error Boundaries** with Suspense for production code
2. **Provide meaningful fallbacks** - use skeleton screens or spinners
3. **Nest Suspense boundaries** for better progressive loading
4. **Use useTransition** for user-initiated updates
5. **Reserve space** for loading content to prevent layout shift
6. **Keep fallbacks simple** - they should be lightweight

---

## Browser Support

React Suspense works in all modern browsers. Features used:

- React 18+ (Suspense, useTransition)
- ES6+ (Promises, async/await)
- Modern JavaScript APIs

---

## Further Reading

- [React Suspense Documentation](https://react.dev/reference/react/Suspense)
- [useTransition Hook](https://react.dev/reference/react/useTransition)
- [Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [Concurrent React](https://react.dev/blog/2022/03/29/react-v18#what-is-concurrent-react)

---
