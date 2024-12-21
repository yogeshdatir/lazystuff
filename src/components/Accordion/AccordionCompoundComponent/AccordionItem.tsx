import { AccordionItemContainer } from './Accordion.styled';
import { AccordionItemProvider } from './AccordionItemContext';
import { useAccordionContext } from './AccordionContext';
import { memo } from 'react';

type Props = {
  children: React.ReactNode;
  value: string;
};

/**
 * Individual accordion item component
 * @param props.children - Content to be rendered inside the accordion item
 * @param props.value - Unique identifier for the accordion item
 */
const AccordionItem: React.FC<Props> = memo(({ children, value }) => {
  const { isItemActive, toggleItem } = useAccordionContext();

  return (
    <AccordionItemProvider
      value={value}
      isExpanded={isItemActive(value)}
      onToggle={() => toggleItem(value)}
    >
      <AccordionItemContainer>{children}</AccordionItemContainer>
    </AccordionItemProvider>
  );
});

AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
