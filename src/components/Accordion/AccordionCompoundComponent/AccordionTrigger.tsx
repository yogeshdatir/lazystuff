import { AccordionTriggerButton } from './Accordion.styled';
import { useAccordionItemContext } from './AccordionItemContext';
import ArrowDown from '../../../assets/icon-arrow-down.svg?react';
import { useAccordionContext } from './AccordionContext';

type Props = {
  children: React.ReactNode;
};

const AccordionTrigger = ({ children }: Props) => {
  const { value, onToggle } = useAccordionItemContext();

  const { isItemActive } = useAccordionContext();

  return (
    <AccordionTriggerButton
      className="w-full flex justify-between"
      onClick={onToggle}
    >
      {children}
      <ArrowDown className={isItemActive(value) ? 'rotate' : ''} />
    </AccordionTriggerButton>
  );
};

export default AccordionTrigger;
