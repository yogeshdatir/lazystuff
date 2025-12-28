import React, { Suspense, useState, useTransition } from 'react';
import { QueryClient, QueryClientProvider, useSuspenseQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

interface Album {
  id: number;
  title: string;
  userId: number;
}

// Fetch albums for different users (different response times)
async function fetchAlbums(userId: number): Promise<Album[]> {
  const delay = userId === 1 ? 500 : 2000; // Fast for user 1, slow for others
  await new Promise(resolve => setTimeout(resolve, delay));
  const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}&_limit=5`);
  return response.json();
}

const TabContent: React.FC<{ userId: number }> = ({ userId }) => {
  const { data } = useSuspenseQuery({
    queryKey: ['albums', userId],
    queryFn: () => fetchAlbums(userId),
  });

  return (
    <div className="p-4 border border-gray-300 mt-2.5 rounded-md">
      <strong>Albums for User {userId}:</strong>
      <ul className="mt-2 ml-4 list-disc">
        {data.slice(0, 3).map(album => (
          <li key={album.id} className="text-sm">{album.title}</li>
        ))}
      </ul>
    </div>
  );
};

export const ConcurrentRenderingExample: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isPending, startTransition] = useTransition();

  const switchTab = (userId: number) => {
    startTransition(() => {
      setActiveTab(userId);
    });
  };

  const getButtonClass = (userId: number) => {
    const baseClass = "px-5 py-2.5 border rounded-md text-sm font-medium mr-1.5";
    if (isPending && activeTab !== userId) {
      return `${baseClass} bg-gray-200 text-gray-700 border-gray-300 opacity-50 cursor-not-allowed`;
    }
    if (activeTab === userId) {
      return `${baseClass} bg-blue-500 text-white border-blue-500 font-bold`;
    }
    return `${baseClass} bg-gray-200 text-gray-700 border-gray-300 cursor-pointer hover:bg-gray-300`;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-5 max-w-[600px]">
        <h2 className="text-2xl font-bold mb-2">Concurrent Rendering with useTransition</h2>
        <p className="mb-4">Old content stays visible while new content loads!</p>

        <div className="mb-2.5">
          {[1, 2, 3].map(userId => (
            <button
              key={userId}
              onClick={() => switchTab(userId)}
              disabled={isPending && activeTab !== userId}
              className={getButtonClass(userId)}
            >
              User {userId}
              {isPending && activeTab === userId && ' ⏳'}
            </button>
          ))}
        </div>

        {isPending && <div className="text-gray-600 mb-2.5">Loading...</div>}

        <Suspense fallback={<div>Loading albums...</div>}>
          <TabContent userId={activeTab} />
        </Suspense>
      </div>
    </QueryClientProvider>
  );
};
