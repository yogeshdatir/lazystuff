import React, { useState } from 'react';

interface Question {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const questions: Question[] = [
  {
    id: 1,
    category: 'Basics',
    question: 'What is React Suspense?',
    answer: 'React Suspense is a feature that allows components to wait for something before rendering, typically asynchronous operations like data fetching or code loading. It provides a declarative way to handle loading states by letting components "suspend" rendering until they are ready. When a component suspends, React will show a fallback UI that you specify, creating a better user experience without manually managing loading states throughout your application.'
  },
  {
    id: 2,
    category: 'Basics',
    question: 'How does Suspense work internally?',
    answer: 'Suspense works by catching thrown promises from child components. When a component needs async data, it throws a promise instead of returning JSX. React catches this thrown promise, pauses rendering of that component tree, and displays the fallback UI specified in the Suspense boundary. When the promise resolves, React retries rendering the component, and this time the data is available so the component renders successfully. This pattern is sometimes called "render-as-you-fetch" because components attempt to render and suspend if data is not ready.'
  },
  {
    id: 3,
    category: 'Basics',
    question: 'What are Suspense boundaries?',
    answer: 'A Suspense boundary is created by wrapping components with the Suspense component. It acts as a catch point for any suspending components within its tree. When any child component suspends, the entire Suspense boundary shows the fallback UI. You can have multiple Suspense boundaries in your app to control granularity of loading states. For example, you might have one boundary for a whole page, or separate boundaries for different sections to show progressive loading.'
  },
  {
    id: 4,
    category: 'Use Cases',
    question: 'What are the main use cases for Suspense?',
    answer: 'The primary use cases are code splitting with React lazy for component lazy loading, data fetching when used with libraries like React Query or Relay, and image or resource loading. Code splitting helps reduce initial bundle size by loading components on demand. Data fetching with Suspense eliminates loading state boilerplate and enables patterns like progressive loading and concurrent rendering. It is particularly useful in scenarios where you want to coordinate multiple async operations or show content progressively as it becomes available.'
  },
  {
    id: 5,
    category: 'Use Cases',
    question: 'When should you use Suspense vs traditional loading states?',
    answer: 'Use Suspense when you want declarative loading states that are closer to where data is used, when coordinating multiple async operations, or when using libraries with Suspense support. Traditional loading states with useState and useEffect are better for simple cases, when you need fine-grained control over loading logic, or when working with libraries that do not support Suspense. Suspense shines in complex applications with multiple data dependencies and when you want to reduce loading state management boilerplate.'
  },
  {
    id: 6,
    category: 'Error Handling',
    question: 'How do you handle errors with Suspense?',
    answer: 'Errors in Suspense are handled using Error Boundaries. You wrap your Suspense component with an Error Boundary component, which is a class component with componentDidCatch or getDerivedStateFromError lifecycle methods. When a component throws an error during suspending or rendering, the Error Boundary catches it and displays a fallback error UI. The pattern is typically Error Boundary wrapping Suspense, so you get complete coverage of all async states: loading through Suspense fallback, success through normal rendering, and error through Error Boundary fallback.'
  },
  {
    id: 7,
    category: 'Error Handling',
    question: 'What is the difference between Suspense fallback and Error Boundary fallback?',
    answer: 'Suspense fallback is shown when a component is waiting for async operations to complete, representing the loading state. Error Boundary fallback is shown when something goes wrong during rendering or async operations, representing the error state. Together they provide complete async state coverage: Suspense handles the pending state, normal rendering handles the success state, and Error Boundary handles the error state. You typically nest them with Error Boundary as the outer wrapper to catch any errors that occur during Suspense resolution.'
  },
  {
    id: 8,
    category: 'Advanced Patterns',
    question: 'What is concurrent rendering and how does it relate to Suspense?',
    answer: 'Concurrent rendering is React ability to work on multiple state updates at different priorities simultaneously. When combined with Suspense and useTransition, you can mark certain updates as non-urgent transitions. During a transition, React keeps the old UI visible and responsive while preparing the new UI in the background. If the new UI suspends, React does not immediately show the fallback; instead it keeps showing the old content until the new content is ready. This creates much smoother user experiences, especially for navigation and search interactions where you want to avoid loading spinners for fast operations.'
  },
  {
    id: 9,
    category: 'Advanced Patterns',
    question: 'Explain useTransition and how it works with Suspense.',
    answer: 'useTransition is a hook that returns an isPending boolean and a startTransition function. You wrap state updates in startTransition to mark them as low priority transitions. When a transition causes a component to suspend, React will not immediately show the Suspense fallback. Instead, React keeps the old UI visible and interactive while preparing the new UI. The isPending flag becomes true during this time, allowing you to show subtle loading indicators like a spinner on a button. This prevents jarring UI changes and keeps the app feeling responsive during navigation or other state changes that involve data loading.'
  },
  {
    id: 10,
    category: 'Advanced Patterns',
    question: 'What is progressive loading and how do you implement it?',
    answer: 'Progressive loading means showing content as it becomes available rather than waiting for everything to load. You implement it by using multiple independent Suspense boundaries for different sections of your UI. Each boundary can resolve independently, so fast-loading content appears immediately while slower content continues loading. For example, a dashboard might show user profile first after one second, then posts after two seconds, then comments after three seconds. This is different from nested Suspense where inner boundaries wait for outer ones. Progressive loading provides better perceived performance and keeps users engaged with partial content.'
  },
  {
    id: 11,
    category: 'React Query Integration',
    question: 'How does React Query work with Suspense?',
    answer: 'React Query provides a useSuspenseQuery hook specifically designed for Suspense. Unlike the regular useQuery which returns loading states, useSuspenseQuery suspends the component when data is being fetched. It throws a promise that Suspense catches, eliminating the need to manually check loading states. React Query handles all the complexity of caching, refetching, and error handling while Suspense handles the UI state. This integration is production-ready and includes features like automatic retries, cache invalidation, and background refetching that work seamlessly with Suspense boundaries.'
  },
  {
    id: 12,
    category: 'React Query Integration',
    question: 'Why use React Query instead of custom Suspense resources?',
    answer: 'React Query is a battle-tested library that handles many edge cases you would otherwise need to implement yourself. It provides automatic caching so the same data is not fetched multiple times, background refetching to keep data fresh, retry logic for failed requests, request deduplication, and cache invalidation strategies. Building these features from scratch is complex and error-prone. Custom Suspense resources can work for learning or very simple cases, but production applications benefit greatly from React Query comprehensive feature set and the expertise embedded in its design.'
  },
  {
    id: 13,
    category: 'Best Practices',
    question: 'Where should you place Suspense boundaries?',
    answer: 'Place Suspense boundaries based on how you want loading states to appear to users. For coarse-grained loading, wrap large sections or entire routes with one boundary. For fine-grained loading, wrap individual components or sections with separate boundaries. Consider user experience: do you want everything to load together or progressively? Place boundaries close to where data is consumed for better code locality, but not so granular that you create a jarring experience with many individual loading states. Strategic placement of boundaries is key to good UX.'
  },
  {
    id: 14,
    category: 'Best Practices',
    question: 'What are common mistakes when using Suspense?',
    answer: 'Common mistakes include forgetting to wrap Suspense with Error Boundaries for error handling, creating too many granular Suspense boundaries that create a jarring experience, not using transitions for navigation which causes unnecessary loading states, fetching data in useEffect instead of using Suspense-compatible libraries, and recreating resources on every render instead of caching them. Another mistake is using Suspense for everything when simpler patterns would work better. Suspense is powerful but should be used thoughtfully based on your actual needs.'
  },
  {
    id: 15,
    category: 'Best Practices',
    question: 'How do you test components that use Suspense?',
    answer: 'Testing Suspense components requires handling async behavior. Use testing libraries like React Testing Library with async utilities like waitFor and findBy queries. You need to wait for Suspense to resolve before asserting on the final rendered output. For components using React Query with Suspense, wrap your test component with QueryClientProvider and configure the QueryClient for testing, often with different retry and cache settings. Mock your API calls and verify both the loading state via the Suspense fallback and the success state once data loads. You may also want to test error states using Error Boundaries.'
  },
  {
    id: 16,
    category: 'Performance',
    question: 'How does Suspense improve performance?',
    answer: 'Suspense improves performance through several mechanisms. Code splitting with React lazy reduces initial bundle size by loading components only when needed. The render-as-you-fetch pattern starts fetching data earlier in the component lifecycle compared to useEffect patterns. Multiple Suspense boundaries enable progressive rendering where fast content shows immediately. When combined with concurrent features like useTransition, Suspense prevents expensive re-renders from blocking user interactions. The declarative nature also reduces JavaScript execution by eliminating loading state management boilerplate. Overall, Suspense enables patterns that both reduce bundle size and optimize the critical rendering path.'
  },
  {
    id: 17,
    category: 'Performance',
    question: 'What is the difference between fetch-on-render and render-as-you-fetch?',
    answer: 'Fetch-on-render is the traditional pattern where you start fetching in useEffect after the component mounts, creating a waterfall where rendering must complete before fetching begins. Render-as-you-fetch starts fetching before or during rendering, often in event handlers or at the route level, so fetching and rendering happen in parallel. Suspense enables render-as-you-fetch by letting you create resources early and have components suspend when they try to read data that is not ready yet. This parallelization significantly improves loading performance, especially in deeply nested component trees where fetch-on-render creates sequential waterfalls.'
  },
  {
    id: 18,
    category: 'Server Components',
    question: 'How does Suspense work with React Server Components?',
    answer: 'React Server Components use Suspense to stream HTML from the server. Server components can suspend while fetching data on the server, and React will send the Suspense fallback HTML to the client immediately. As server components resolve, React streams the actual content to the client and updates the DOM. This enables progressive rendering where users see fallback content instantly while the server is still processing. It is particularly powerful in frameworks like Next.js where you can have a mix of server and client components, with Suspense coordinating loading states across both environments seamlessly.'
  },
  {
    id: 19,
    category: 'Comparison',
    question: 'How is Suspense different from async/await?',
    answer: 'Async await is a JavaScript language feature for handling promises in an imperative, sequential way within functions. Suspense is a React feature for declaratively handling async operations in the component tree. Async await works well in event handlers and utility functions, but it cannot pause component rendering. Suspense is specifically designed to coordinate rendering with async operations. You often use both together: async await in your data fetching functions, and Suspense to handle the loading states in your components. They serve different purposes and complement each other in React applications.'
  },
  {
    id: 20,
    category: 'Comparison',
    question: 'What are alternatives to Suspense and when would you use them?',
    answer: 'Alternatives include traditional loading states with useState and useEffect, render props patterns, higher-order components for loading states, and state management libraries like Redux with loading flags. Use these alternatives when you need fine-grained control over loading behavior, when working with libraries without Suspense support, for simple one-off loading states, or in class components. For new projects using function components with modern libraries, Suspense is generally preferred due to its declarative nature and better integration with concurrent features. The choice often depends on your existing architecture and specific requirements.'
  }
];

export const InterviewPrepExample: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const categories = ['All', ...Array.from(new Set(questions.map(q => q.category)))];
  const filteredQuestions = selectedCategory === 'All'
    ? questions
    : questions.filter(q => q.category === selectedCategory);

  const toggleQuestion = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">React Suspense Interview Prep</h1>
        <p className="text-gray-600 mb-4">
          Common interview questions with detailed explanations. Click on any question to reveal the answer.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredQuestions.map((q) => (
          <div
            key={q.id}
            className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => toggleQuestion(q.id)}
              className="w-full text-left p-4 bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded mb-2">
                    {q.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {q.id}. {q.question}
                  </h3>
                </div>
                <span className="ml-4 text-gray-400 text-xl">
                  {expandedId === q.id ? '−' : '+'}
                </span>
              </div>
            </button>

            {expandedId === q.id && (
              <div className="px-4 pb-4 bg-gray-50">
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">
                    {q.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Interview Tips:</h3>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>• Explain concepts in your own words rather than memorizing definitions</li>
          <li>• Use real-world examples from your experience when possible</li>
          <li>• Mention trade-offs and when NOT to use Suspense</li>
          <li>• Connect Suspense to related concepts like Error Boundaries and concurrent features</li>
          <li>• Be prepared to discuss both the benefits and limitations</li>
        </ul>
      </div>
    </div>
  );
};
