// Tutorial: https://youtu.be/bAJlYgeovlg
// Repo: https://github.com/WebDevSimplified/react-select

import styled from "@emotion/styled";
import React, { KeyboardEvent, useState } from "react";
import { ReactComponent as CheckedIcon } from "../../../assets/icons8-done.svg";

export type ISelectOption = {
  label: string;
  value: string | number;
};

type MultiSelectProps = {
  multiple: true;
  value: ISelectOption[];
  onChange: (value: ISelectOption[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value?: ISelectOption;
  onChange: (value: ISelectOption | undefined) => void;
};

// interface IProps {
//   multiple?: boolean;
//   value?: ISelectOption | ISelectOption[];
//   onChange: (value: ISelectOption | ISelectOption[] | undefined) => void;
//   options: ISelectOption[];
// }

type IProps = {
  options: ISelectOption[];
} & (SingleSelectProps | MultiSelectProps);

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
    isHighlightedIndex ? "hsl(200, 100%, 50%)" : "transparent"};
  color: ${({ isHighlightedIndex }) => (isHighlightedIndex ? "white" : "")};
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

const SelectedOptionBadge = styled.button`
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

const MultiSelectWithCheckbox = ({
  multiple,
  value,
  options,
  onChange,
}: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  const clearOptions = () => {
    if (multiple) {
      onChange([]);
    } else {
      onChange(undefined);
    }
  };

  const isOptionSelected = (option: ISelectOption) => {
    if (multiple)
      return value.some(
        (element: ISelectOption) =>
          JSON.stringify(element) === JSON.stringify(option)
      );
    return JSON.stringify(option) === JSON.stringify(value);
  };

  const selectOption = (option: ISelectOption) => {
    if (multiple) {
      if (!isOptionSelected(option)) {
        onChange([...value, option]);
      } else {
        onChange(
          value.filter(
            (element: ISelectOption) =>
              JSON.stringify(element) !== JSON.stringify(option)
          )
        );
      }
    } else {
      if (!isOptionSelected(option)) onChange(option);
    }
  };

  const keyboardHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.code) {
      case "Enter":
      case "Space":
        if (multiple) setIsOpen(true);
        else setIsOpen((prev: boolean) => !prev);
        if (isOpen) selectOption(options[hoveredIndex]);
        break;

      case "ArrowUp":
      case "ArrowDown": {
        if (!isOpen) {
          setIsOpen(true);
          break;
        }

        const newHighlightedIndex =
          hoveredIndex + (event.code === "ArrowDown" ? 1 : -1);
        if (newHighlightedIndex >= 0 && newHighlightedIndex < options.length) {
          setHoveredIndex(newHighlightedIndex);
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
        setHoveredIndex(0);
      }}
      onBlur={() => {
        setIsOpen(false);
        setHoveredIndex(0);
      }}
      onKeyDown={keyboardHandler}
    >
      <SelectBox>
        <SelectedValueText>
          {multiple
            ? value.map((selectedOption: ISelectOption) => (
                <SelectedOptionBadge
                  key={selectedOption.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectOption(selectedOption);
                  }}
                >
                  {selectedOption.label}

                  <span className="remove-btn">&times;</span>
                </SelectedOptionBadge>
              ))
            : value?.label}
        </SelectedValueText>
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
        {options.map((option: ISelectOption, index: number) => {
          return (
            <Option
              key={option.value}
              value={option.value}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                if (!multiple) setIsOpen(false);
              }}
              onMouseEnter={() => {
                setHoveredIndex(index);
              }}
              isSelected={isOptionSelected(option)}
              isHighlightedIndex={hoveredIndex === index}
            >
              {/* TODO: Create checkbox without input element */}
              <div
                role="checkbox"
                aria-checked={false}
                style={{
                  width: "1rem",
                  height: "1rem",
                  border: "1px solid black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                {isOptionSelected(option) && <CheckedIcon />}
              </div>
              {option.label}
            </Option>
          );
        })}
      </OptionsBox>
    </Container>
  );
};

export default MultiSelectWithCheckbox;
