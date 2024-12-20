// type Props = {};

import { useState } from 'react';
import AccordionItem from './AccordionItem';

const Accordion = () => {
  const [expandedItems, setExpandedItems] = useState([]);

  return (
    <div>
      <Accordion.AccordionItem />
      <div>
        <h3>
          <button>
            <span>
              Accordion Title
              <span>Accordion Icon</span>
            </span>
          </button>
        </h3>
        <div>Accordion Content</div>
      </div>
      <div>
        <h3>
          <button>
            <span>
              Accordion Title
              <span>Accordion Icon</span>
            </span>
          </button>
        </h3>
        <div>Accordion Content</div>
      </div>
    </div>
  );
};

Accordion.AccordionItem = AccordionItem;

export default Accordion;
