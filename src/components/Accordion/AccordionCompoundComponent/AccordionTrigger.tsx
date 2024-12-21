import { AccordionTriggerButton } from './Accordion.styled';
import { useAccordionItemContext } from './AccordionItemContext';
import ArrowDown from '../../../assets/icon-arrow-down.svg?react';
import { useAccordionContext } from './AccordionContext';
import { memo } from 'react';

type Props = {
  children: React.ReactNode;
};

/**
 * Trigger button component for accordion items
 * @param props.children - Content to be rendered inside the trigger button
 */
const AccordionTrigger: React.FC<Props> = memo(({ children }) => {
  const { value, onToggle } = useAccordionItemContext();
  const { isItemActive } = useAccordionContext();

  return (
    <AccordionTriggerButton
      className="w-full flex justify-between"
      onClick={onToggle}
      aria-expanded={isItemActive(value)}
    >
      {children}
      <ArrowDown className={isItemActive(value) ? 'rotate' : ''} />
    </AccordionTriggerButton>
  );
});

AccordionTrigger.displayName = 'AccordionTrigger';

export default AccordionTrigger;
