import type { Meta, StoryObj } from '@storybook/react';
import { ImageLazyLoadingExample } from './ImageLazyLoadingExample';

const meta: Meta<typeof ImageLazyLoadingExample> = {
  title: 'Suspense Examples/06 - Image Lazy Loading',
  component: ImageLazyLoadingExample,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Image Lazy Loading with Suspense

This example demonstrates using Suspense to handle image loading states elegantly.

### Use Case
- Image galleries
- Photo viewers
- Product images
- Avatar loading
- Any scenario where images load asynchronously

### Key Features
- Suspense-compatible image loading
- No broken image flashing
- Graceful loading states
- Prevents layout shift
- Progressive rendering

### How It Works
1. Wrap image URL in a resource
2. Resource creates Image() object
3. Promise suspends until image loads
4. Suspense shows fallback during load
5. Image renders when fully loaded

### Benefits Over Standard Loading
**Standard approach:**
\`\`\`tsx
<img src={url} onLoad={...} onError={...} />
\`\`\`
- Shows broken image icon while loading
- Requires manual state management
- Potential layout shift
- Flashing content

**Suspense approach:**
\`\`\`tsx
<Suspense fallback={<Loading />}>
  <SuspenseImage resource={imageResource} />
</Suspense>
\`\`\`
- Clean loading indicator
- No broken images
- Declarative
- Consistent with other async patterns

### When to Use
- High-quality images that take time to load
- Image galleries or carousels
- User-uploaded content
- Dynamic image loading
- When you want consistent async UX

### Advanced Use Cases
- Combine with nested Suspense for image grids
- Use with useTransition for smooth image switching
- Pair with Error Boundary for failed loads
- Progressive enhancement with blur placeholders
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ImageLazyLoadingExample>;

const sourceCode = `import React, { Suspense, useState } from 'react';
import { LoadingSpinner } from '../shared/LoadingSpinner';

interface ImageResource {
  read(): string;
}

/**
 * Wraps an image URL in a Suspense-compatible resource
 * The image will suspend until it's fully loaded
 */
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
      if (status === 'pending') {
        throw suspender; // Suspense catches this promise
      } else if (status === 'error') {
        throw new Error('Failed to load image');
      } else {
        return result;
      }
    }
  };
}

/**
 * Image component that suspends while loading
 */
const SuspenseImage: React.FC<{
  resource: ImageResource;
  alt: string;
}> = ({ resource, alt }) => {
  const src = resource.read();
  return <img src={src} alt={alt} />;
};

export const ImageLazyLoadingExample: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{
    resource: ImageResource;
    alt: string;
  } | null>(null);

  const handleLoadImage = (imageUrl: string, alt: string) => {
    setSelectedImage({
      resource: createImageResource(imageUrl),
      alt
    });
  };

  return (
    <div>
      <button onClick={() => handleLoadImage('https://...', 'Image 1')}>
        Load Image
      </button>

      {selectedImage && (
        <Suspense fallback={<LoadingSpinner message="Loading image..." />}>
          <SuspenseImage
            resource={selectedImage.resource}
            alt={selectedImage.alt}
          />
        </Suspense>
      )}
    </div>
  );
};

// Benefits:
// - No broken image icons during loading
// - Prevents layout shift with reserved space
// - Consistent loading experience
// - Works great with image galleries`;

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
