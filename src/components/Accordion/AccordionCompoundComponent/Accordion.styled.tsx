import styled from '@emotion/styled';

type AccordionContentContainerProps = {
  contentHeight: number;
};

export const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const AccordionItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid gray;
`;

export const AccordionItemTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AccordionContentContainer = styled.div<AccordionContentContainerProps>`
  display: flex;
  max-height: ${({ contentHeight }) => `${contentHeight}px`};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  will-change: max-height;

  svg {
    transition: transform 0.3s ease-in-out;
  }

  &.hide {
    max-height: 0;
  }
`;

export const AccordionTriggerButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  text-decoration: none;
  transition: text-decoration 0.2s ease;

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  &:hover {
    text-decoration: underline;
  }

  svg {
    transition: transform 0.3s ease-in-out;
  }

  svg.rotate {
    transform: rotate(180deg);
  }
`;
