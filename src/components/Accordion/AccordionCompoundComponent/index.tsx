import AccordionItem from './AccordionItem';
import { AccordionContainer } from './Accordion.styled';
import AccordionContent from './AccordionContent';
import AccordionTrigger from './AccordionTrigger';
import { AccordionProvider } from './AccordionContext';

type Props = {
  children: React.ReactNode;
  allowMultiple?: boolean;
};

type AccordionComponent = {
  AccordionItem: typeof AccordionItem;
  AccordionTrigger: typeof AccordionTrigger;
  AccordionContent: typeof AccordionContent;
};

/**
 * Accordion component that implements the compound component pattern
 * @param props.children - The accordion items to render
 * @param props.allowMultiple - Whether multiple items can be expanded at once
 */
const Accordion: React.FC<Props> & AccordionComponent = ({
  children,
  allowMultiple = false,
}) => {
  return (
    <AccordionProvider allowMultiple={allowMultiple}>
      <AccordionContainer>{children}</AccordionContainer>
    </AccordionProvider>
  );
};

Accordion.AccordionItem = AccordionItem;
Accordion.AccordionTrigger = AccordionTrigger;
Accordion.AccordionContent = AccordionContent;

export default Accordion;
