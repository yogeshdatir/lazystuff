import styled from '@emotion/styled';

export const AccordionContainer = styled.div`
  text-align: left;
`;

interface IAccordionStyledProps {
  show: boolean;
}

export const AccordionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: ${({ show }: IAccordionStyledProps) => (show ? '700' : '400')};

  transition: font-weight 50ms;

  span {
    cursor: pointer;
    svg {
      transform: ${({ show }: IAccordionStyledProps) =>
        show ? 'rotate(180deg)' : ''};
      transition: transform 500ms;
    }
  }
`;

export const AccordionContent = styled.div`
  padding-top: 0.75rem;
  height: ${({ show }: IAccordionStyledProps) => (show ? 'auto' : '0')};
  transition: height 500ms;
`;

export const AccordionDivider = styled.div`
  margin: 1rem 0;
  height: 1px;
  width: 100%;
  background: #e8e8ea;
`;
