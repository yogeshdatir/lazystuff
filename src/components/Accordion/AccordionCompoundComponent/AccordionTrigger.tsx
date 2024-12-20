import { AccordionTriggerButton } from './Accordion.styled';
import { useAccordionItemContext } from './AccordionItemContext';

interface Props {
  children: React.ReactNode;
}

const AccordionTrigger = ({ children }: Props) => {
  const { onToggle } = useAccordionItemContext();

  return (
    <AccordionTriggerButton
      className="w-full flex justify-between"
      onClick={onToggle}
    >
      {children}
    </AccordionTriggerButton>
  );
};

export default AccordionTrigger;
