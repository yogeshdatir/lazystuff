import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
  width: 20em;
  min-height: 1.5em;
  border: 0.05em solid #777;
  border-radius: 0.25em;
  outline: none;
`;

export const SelectBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 0.25em;

  :focus,
  :focus-visible,
  :focus-within {
    outline: 1.5px solid hsl(200, 100%, 50%);
  }
`;

export const SelectedValueText = styled.span`
  flex-grow: 1;
  display: flex;
  gap: 0.5em;
  flex-wrap: wrap;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  margin-left: auto;
`;

export const ClearButton = styled.button`
  background: none;
  color: #777;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  font-size: 1.25em;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  :focus,
  :hover {
    color: #222;
    scale: 1.1;
  }
`;

export const Divider = styled.div`
  background-color: #777;
  align-self: stretch;
  width: 0.05em;
`;

export const Caret = styled.div`
  translate: 0 30%;
  border: 0.35em solid transparent;
  border-top-color: #777;
  cursor: pointer;
`;

export const CaretWrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  :focus,
  :hover {
    div {
      border-top-color: #222;
      scale: 1.1;
    }
  }
`;

interface IOptionBox {
  show: boolean;
}

export const OptionsBox = styled.ul<IOptionBox>`
  position: absolute;
  margin: 0;
  padding: 0;
  list-style: none;
  display: ${({ show }) => (show ? 'block' : 'none')};
  max-height: 15em;
  overflow-y: auto;
  border: 0.05em solid #777;
  border-radius: 0.25em;
  width: 100%;
  left: 0;
  top: calc(100% + 0.25em);
  background-color: white;
  z-index: 100;
`;

interface IOption {
  isHighlightedIndex?: boolean;
}

export const Option = styled.li<IOption>`
  padding: 0.25em 0.5em;
  cursor: pointer;
  background-color: ${({ isHighlightedIndex }) =>
    isHighlightedIndex ? 'hsl(200, 100%, 50%)' : 'transparent'};
  color: ${({ isHighlightedIndex }) => (isHighlightedIndex ? 'white' : '')};
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

export const SelectedOptionBadge = styled.button`
  display: flex;
  align-items: center;
  border: 0.05em solid #777;
  border-radius: 0.25em;
  padding: 0.15em 0.25em;
  gap: 0.25em;
  cursor: pointer;
  background: none;
  outline: none;

  :hover,
  :focus {
    background-color: hsl(0, 100%, 90%);
    border-color: hsl(0, 100%, 50%);
  }

  :hover > .remove-btn,
  :focus > .remove-btn {
    color: hsl(0, 100%, 50%);
  }

  .remove-btn {
    font-size: 1.25em;
    color: #777;
  }
`;

export const CustomCheckbox = styled.div`
  width: 1rem;
  height: 1rem;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const SearchWrapper = styled.div`
  padding: 0.25em 0.5em;
`;

export const SearchInput = styled.input`
  width: 100%;
  border-radius: 2px;
  border: 0.05em solid #777;

  :focus-visible {
    outline: 1.5px solid hsl(200, 100%, 50%);
  }
`;

export const CustomPlaceholderText = styled.span`
  color: gray;
`;
