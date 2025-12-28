import React, { Suspense, useState } from 'react';

interface ImageResource {
  read(): string;
}

function createImageResource(src: string): ImageResource {
  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: string;

  const suspender = new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      status = 'success';
      result = src;
      resolve();
    };
    img.onerror = () => {
      status = 'error';
      reject(new Error('Failed to load image'));
    };
    img.src = src;
  });

  return {
    read(): string {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw new Error('Failed to load image');
      return result;
    }
  };
}

const SuspenseImage: React.FC<{ resource: ImageResource; alt: string }> = ({ resource, alt }) => {
  const src = resource.read();
  return <img src={src} alt={alt} className="block rounded-lg max-w-sm border border-gray-300" />;
};

const images = [
  { id: 1, url: 'https://picsum.photos/400/300?random=1', title: 'Image 1' },
  { id: 2, url: 'https://picsum.photos/400/300?random=2', title: 'Image 2' },
  { id: 3, url: 'https://picsum.photos/400/300?random=3', title: 'Image 3' },
];

export const ImageLazyLoadingExample: React.FC = () => {
  const [selected, setSelected] = useState<{ resource: ImageResource; title: string } | null>(null);

  const loadImage = (url: string, title: string) => {
    setSelected({ resource: createImageResource(url), title });
  };

  return (
    <div className="p-5 max-w-[600px]">
      <h2 className="text-2xl font-bold mb-2">Image Lazy Loading</h2>
      <p className="mb-4">Images suspend until fully loaded - no broken image icons!</p>

      <div className="mb-4">
        {images.map(img => (
          <button
            key={img.id}
            onClick={() => loadImage(img.url, img.title)}
            className="px-5 py-2.5 bg-blue-500 text-white rounded-md cursor-pointer text-sm font-medium mr-1.5 hover:bg-blue-600"
          >
            {img.title}
          </button>
        ))}
      </div>

      {selected && (
        <div>
          <h3 className="mb-2.5 text-xl font-semibold">{selected.title}</h3>
          <Suspense fallback={<div className="p-4 border border-dashed border-gray-400 rounded-lg text-gray-600">Loading image...</div>}>
            <SuspenseImage resource={selected.resource} alt={selected.title} />
          </Suspense>
        </div>
      )}
    </div>
  );
};
