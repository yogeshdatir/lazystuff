// Tutorial: https://youtu.be/bAJlYgeovlg
// Repo: https://github.com/WebDevSimplified/react-select

import styled from "@emotion/styled";
import React, { KeyboardEvent, useState } from "react";

export interface SelectOption {
  label: string;
  value: string | number;
}

interface IProps {
  value?: SelectOption;
  options: SelectOption[];
  onChange: (value: SelectOption | undefined) => void;
}

const Container = styled.div`
  position: relative;
  width: 20em;
  min-height: 1.5em;
  border: 0.05em solid #777;
  border-radius: 0.25em;
  outline: none;

  :focus {
    border-color: hsl(200, 100%, 50%);
  }
`;

const SelectBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em;
  cursor: pointer;
  box-sizing: border-box;
`;

const SelectedValueText = styled.span`
  flex-grow: 1;
  display: flex;
  gap: 0.5em;
  flex-wrap: wrap;
`;

const ClearButton = styled.button`
  background: none;
  color: #777;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  font-size: 1.25em;

  :focus,
  :hover {
    color: #222;
    scale: 1.1;
  }
`;

const Divider = styled.div`
  background-color: #777;
  align-self: stretch;
  width: 0.05em;
`;

const Caret = styled.div`
  translate: 0 30%;
  border: 0.35em solid transparent;
  border-top-color: #777;
  cursor: pointer;
`;

interface IOptionBox {
  show: boolean;
}

const OptionsBox = styled.ul<IOptionBox>`
  position: absolute;
  margin: 0;
  padding: 0;
  list-style: none;
  display: ${({ show }) => (show ? "block" : "none")};
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
  isSelected: boolean;
}

const Option = styled.li<IOption>`
  padding: 0.25em 0.5em;
  cursor: pointer;
  background-color: ${({ isSelected, isHighlightedIndex }) =>
    isSelected
      ? "hsl(200, 100%, 70%)"
      : isHighlightedIndex
      ? "hsl(200, 100%, 50%)"
      : "transparent"};
  color: ${({ isSelected, isHighlightedIndex }) =>
    !isSelected && isHighlightedIndex ? "white" : ""};
`;

const SelectD2 = ({ value, options, onChange }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

  const clearOptions = () => {
    onChange(undefined);
  };

  const selectOption = (option: SelectOption) => {
    onChange(option);
  };

  const isOptionSelected = (option: SelectOption) => {
    return JSON.stringify(option) === JSON.stringify(value);
  };

  const keyboardHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.code) {
      case "Enter":
      case "Space":
        setIsOpen((prev: boolean) => !prev);
        if (isOpen) selectOption(options[highlightedIndex]);
        break;

      case "ArrowUp":
      case "ArrowDown": {
        if (!isOpen) {
          setIsOpen(true);
          break;
        }

        const newHighlightedIndex =
          highlightedIndex + (event.code === "ArrowDown" ? 1 : -1);
        if (newHighlightedIndex >= 0 && newHighlightedIndex < options.length) {
          setHighlightedIndex(newHighlightedIndex);
        }
        break;
      }

      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  return (
    <Container
      tabIndex={0}
      onClick={() => {
        setIsOpen((prev: boolean) => !prev);
        setHighlightedIndex(0);
      }}
      onBlur={() => {
        setIsOpen(false);
        setHighlightedIndex(0);
      }}
      onKeyDown={keyboardHandler}
    >
      <SelectBox>
        <SelectedValueText>{value?.label}</SelectedValueText>
        <ClearButton
          onClick={(e) => {
            e.stopPropagation();
            clearOptions();
          }}
        >
          &times;
        </ClearButton>
        <Divider />
        <Caret></Caret>
      </SelectBox>
      <OptionsBox show={isOpen}>
        {options.map((option: SelectOption, index: number) => {
          return (
            <Option
              key={option.value}
              value={option.value}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                setIsOpen(false);
              }}
              onMouseEnter={() => {
                setHighlightedIndex(index);
              }}
              isSelected={isOptionSelected(option)}
              isHighlightedIndex={highlightedIndex === index}
            >
              {option.label}
            </Option>
          );
        })}
      </OptionsBox>
    </Container>
  );
};

export default SelectD2;
