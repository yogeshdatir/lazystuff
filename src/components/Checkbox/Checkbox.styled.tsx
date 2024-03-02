import styled from "@emotion/styled";

export const Label = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

interface ICheckedIconContainer {
  circular?: boolean;
}

export const CheckedIconContainer = styled.div<ICheckedIconContainer>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ circular }) => (circular ? "50%" : "")};
  height: 1rem;
  width: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.5);
`;
