import { AccordionItemContainer } from './Accordion.styled';
import { AccordionItemProvider } from './AccordionItemContext';
import { useAccordionContext } from './AccordionContext';

interface Props {
  children: React.ReactNode;
  value: string;
}

const AccordionItem = ({ children, value }: Props) => {
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
};

export default AccordionItem;
