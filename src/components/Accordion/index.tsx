import { useState } from 'react';
import {
  AccordionContent,
  AccordionTitle,
  AccordionContainer,
  AccordionDivider,
} from './Accordion.styled';
import { ReactComponent as ArrowDown } from './images/icon-arrow-down.svg';

interface IProps {
  title: string;
  content: string;
}

const Accordion = ({ title, content }: IProps) => {
  const [show, setShow] = useState(false);
  return (
    <AccordionContainer>
      <AccordionTitle show={show}>
        <p>{title}</p>
        <span
          onClick={() => {
            setShow((prev) => !prev);
          }}
        >
          <ArrowDown />
        </span>
      </AccordionTitle>
      {show && <AccordionContent show={show}>{content}</AccordionContent>}
      <AccordionDivider />
    </AccordionContainer>
  );
};

export default Accordion;
