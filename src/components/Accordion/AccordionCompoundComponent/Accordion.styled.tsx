import styled from '@emotion/styled';

export const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
`;

export const AccordionItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AccordionItemTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AccordionContentContainer = styled.div`
  transition: height 0.3s ease-in-out;

  &.show {
    height: 100%;
  }

  &.hide {
    height: 0;
  }
`;

export const AccordionTriggerButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
