# Accordion Animation Implementation Guide

## How the Animation Works

1. The animation uses `max-height` transitions with CSS
2. Uses a `contentHeight` state to store the actual height of the content
3. Toggles between full height and 0 using a CSS class
4. Implements smooth transitions using CSS `transition` property

## Step by Step Implementation Guide

### 1. Set up the Styled Component

```typescript:src/components/Accordion/AccordionCompoundComponent/Accordion.styled.tsx
// ... other styled components

export const AccordionContentContainer = styled.div<{ contentHeight: number }>`
  display: flex;
  max-height: ${({ contentHeight }) => `${contentHeight}px`};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  will-change: max-height;

  &.hide {
    max-height: 0;
  }
`;
```

Key points:

- `transition` property handles the animation
- `will-change` optimizes the animation performance
- `overflow: hidden` ensures content doesn't spill during animation
- Dynamic `max-height` based on content size

### 2. Implement the Content Component Logic

```typescript:src/components/Accordion/AccordionCompoundComponent/AccordionContent.tsx
type Props = {
  children: React.ReactNode;
}

const AccordionContent = ({ children }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const { isItemActive } = useAccordionContext();
  const { value } = useAccordionItemContext();

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setContentHeight(height);
    }
  }, [children]);

  return (
    <AccordionContentContainer
      ref={contentRef}
      className={isItemActive(value) ? '' : 'hide'}
      contentHeight={contentHeight}
    >
      {children}
    </AccordionContentContainer>
  );
};
```

Key points:

- `useRef` to measure the content's height
- `useEffect` to update height when content changes
- Toggle `hide` class based on active state

## Usage Instructions

1. The accordion content will automatically animate when:

   - Opening (expands from 0 to full height)
   - Closing (collapses from full height to 0)

2. The animation timing can be adjusted by modifying the transition duration:

   ```css
   transition: max-height 0.3s ease-in-out;
   ```

3. The animation will automatically handle content changes thanks to the `useEffect` dependency on `children`

## Tips and Considerations

1. **Dynamic Content**: The height is recalculated whenever the children change, ensuring accurate animations even with dynamic content.

2. **Performance**: Using `will-change` helps browser optimization, but use it sparingly as it can consume memory.

3. **Smooth Animation**: The `ease-in-out` timing function provides a smooth feel to the animation.

4. **Accessibility**: The animation doesn't interfere with accessibility as it's purely visual.

5. **Browser Support**: This animation approach works in all modern browsers.

You can adjust the animation duration and timing function in the styled component to match your design requirements. The current 0.3s duration provides a good balance between speed and smoothness.
