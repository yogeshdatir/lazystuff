import Accordion from '.';
import { accordionData } from './AccordionData';

const SimpleAccordion = () => {
  return (
    <div>
      {accordionData.map((entry) => {
        return <Accordion key={entry.title} {...entry} />;
      })}
    </div>
  );
};

export default SimpleAccordion;
