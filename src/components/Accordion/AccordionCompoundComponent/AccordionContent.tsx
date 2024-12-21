import { useEffect, useRef, useState } from 'react';
import { AccordionContentContainer } from './Accordion.styled';
import { useAccordionContext } from './AccordionContext';
import { useAccordionItemContext } from './AccordionItemContext';
interface Props {
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
  }, [children]); // Re-measure when content changes

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

export default AccordionContent;
