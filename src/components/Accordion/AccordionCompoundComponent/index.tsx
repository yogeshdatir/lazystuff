// type Props = {};

import AccordionItem from './AccordionItem';
import { AccordionContainer } from './Accordion.styled';
import AccordionContent from './AccordionContent';
import AccordionTrigger from './AccordionTrigger';
import { AccordionProvider } from './AccordionContext';

interface Props {
  children: React.ReactNode;
}

const Accordion = ({ children }: Props) => {
  return (
    <AccordionProvider>
      <AccordionContainer>{children}</AccordionContainer>
    </AccordionProvider>
  );
};

Accordion.AccordionItem = AccordionItem;
Accordion.AccordionTrigger = AccordionTrigger;
Accordion.AccordionContent = AccordionContent;

export default Accordion;
