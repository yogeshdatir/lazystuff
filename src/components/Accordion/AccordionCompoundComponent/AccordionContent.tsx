import { useEffect, useRef, useState, memo } from 'react';
import { AccordionContentContainer } from './Accordion.styled';
import { useAccordionContext } from './AccordionContext';
import { useAccordionItemContext } from './AccordionItemContext';

type Props = {
  children: React.ReactNode;
};

/**
 * Content component for accordion items with height animation
 * @param props.children - Content to be rendered inside the accordion panel
 */
const AccordionContent: React.FC<Props> = memo(({ children }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

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
      role="region"
      aria-hidden={!isItemActive(value)}
    >
      {children}
    </AccordionContentContainer>
  );
});

AccordionContent.displayName = 'AccordionContent';

export default AccordionContent;
