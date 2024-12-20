import { AccordionContentContainer } from './Accordion.styled';
import { useAccordionContext } from './AccordionContext';
import { useAccordionItemContext } from './AccordionItemContext';
interface Props {
  children: React.ReactNode;
}

const AccordionContent = ({ children }: Props) => {
  const { isItemActive } = useAccordionContext();
  const { value } = useAccordionItemContext();

  return (
    <AccordionContentContainer
      className={isItemActive(value) ? 'show' : 'hide'}
    >
      {children}
    </AccordionContentContainer>
  );
};

export default AccordionContent;
