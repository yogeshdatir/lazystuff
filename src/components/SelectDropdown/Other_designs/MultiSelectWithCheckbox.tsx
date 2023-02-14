// Tutorial: https://youtu.be/bAJlYgeovlg
// Repo: https://github.com/WebDevSimplified/react-select

import styled from '@emotion/styled';
import React, { KeyboardEvent, MouseEvent, useRef, useState } from 'react';
import { ReactComponent as CheckedIcon } from '../../../assets/icons8-done.svg';
import useClickOutside from '../../../hooks/useClickOutside';

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
  placeholder?: string | number;
} & (SingleSelectProps | MultiSelectProps);

const Container = styled.div`
  position: relative;
  width: 20em;
  min-height: 1.5em;
  border: 0.05em solid #777;
  border-radius: 0.25em;
  outline: none;
`;

const SelectBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 0.25em;

  :focus,
  :focus-visible {
    outline: 1.5px solid hsl(200, 100%, 50%);
  }
`;

const SelectedValueText = styled.span`
  flex-grow: 1;
  display: flex;
  gap: 0.5em;
  flex-wrap: wrap;
`;

const ActionsWrapper = styled.div`
  display: flex;
  margin-left: auto;
`;

const ClearButton = styled.button`
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

const CaretWrapper = styled.div`
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

const OptionsBox = styled.ul<IOptionBox>`
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
  isSelected: boolean;
}

const Option = styled.li<IOption>`
  padding: 0.25em 0.5em;
  cursor: pointer;
  background-color: ${({ isSelected, isHighlightedIndex }) =>
    isHighlightedIndex ? 'hsl(200, 100%, 50%)' : 'transparent'};
  color: ${({ isHighlightedIndex }) => (isHighlightedIndex ? 'white' : '')};
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

const SearchWrapper = styled.div`
  padding: 0.25em 0.5em;
`;

const SearchInput = styled.input`
  width: 100%;
  border-radius: 2px;
  border: 0.05em solid #777;

  :focus-visible {
    outline: 1.5px solid hsl(200, 100%, 50%);
  }
`;

const CustomPlaceholderText = styled.span`
  color: gray;
`;

// TODO: Add keyboard accessibility to search input
// TODO: Add select all feature
// TODO: Add options groups
// TODO: Add select all for option groups
// TODO: Add async await
// TODO: Add empty state option
// TODO: Bug: Pressing enter on clearOption icon clears the selections but if user presses down arrow and selects option then it doesn't work and dropdown is closed

const DEFAULT_PLACEHOLDER_COPY = `Select an option...`;
const MultiSelectWithCheckbox = ({
  multiple,
  value,
  options,
  onChange,
  placeholder = DEFAULT_PLACEHOLDER_COPY,
}: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => {
    if (isOpen) setIsOpen(!isOpen);
  });

  const [searchTerm, setSearchTerm] = useState<string>('');

  const [filteredOptions, setFilteredOptions] = useState<ISelectOption[]>([]);

  const clearOptions = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (multiple) {
      onChange([]);
    } else {
      onChange(undefined);
    }
  };

  const filterOptions = (searchTermArg: string | number) => {
    const filteredOpts = options.filter((option: ISelectOption) => {
      if (
        option.label
          .toString()
          .toLowerCase()
          .includes(searchTermArg.toString().toLowerCase())
      )
        return option;
      return null;
    });
    setFilteredOptions([...filteredOpts]);
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
      case 'Enter':
      case 'NumpadEnter':
      case 'Space':
        if (multiple) setIsOpen(true);
        else setIsOpen((prev: boolean) => !prev);
        if (isOpen) selectOption(options[hoveredIndex]);
        break;

      case 'ArrowUp':
      case 'ArrowDown': {
        if (!isOpen) {
          setIsOpen(true);
          break;
        }

        const newHighlightedIndex =
          hoveredIndex + (event.code === 'ArrowDown' ? 1 : -1);
        if (newHighlightedIndex >= 0 && newHighlightedIndex < options.length) {
          setHoveredIndex(newHighlightedIndex);
        }
        break;
      }

      case 'Escape':
      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  const renderOptions = (optionList: ISelectOption[]) => {
    return optionList.map((option: ISelectOption, index: number) => {
      return (
        <Option
          key={option.value}
          value={option.value}
          onMouseDown={() => {
            selectOption(option);
            if (!multiple) setIsOpen(false);
          }}
          onMouseEnter={() => {
            setHoveredIndex(index);
          }}
          isSelected={isOptionSelected(option)}
          isHighlightedIndex={hoveredIndex === index}
        >
          <div
            role="checkbox"
            aria-checked={false}
            style={{
              width: '1rem',
              height: '1rem',
              border: '1px solid black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            {isOptionSelected(option) && <CheckedIcon />}
          </div>
          {option.label}
        </Option>
      );
    });
  };

  // * Note: closing dropdown using onBlur is a spoiler specially for multiselect.
  return (
    <Container ref={wrapperRef}>
      <SelectBox
        tabIndex={0}
        onClick={() => {
          setIsOpen((prev: boolean) => !prev);
          setHoveredIndex(0);
        }}
        onKeyDown={keyboardHandler}
      >
        <SelectedValueText>
          {multiple ? (
            value.length ? (
              value.map((selectedOption: ISelectOption) => (
                <SelectedOptionBadge
                  key={selectedOption.value}
                  onClick={(e) => {
                    selectOption(selectedOption);
                  }}
                >
                  {selectedOption.label}
                  <span className="remove-btn">&times;</span>
                </SelectedOptionBadge>
              ))
            ) : (
              <CustomPlaceholder />
            )
          ) : (
            value?.label || <CustomPlaceholder />
          )}
        </SelectedValueText>
        <ActionsWrapper>
          <ClearButton onClick={clearOptions}>&times;</ClearButton>
          <Divider />
          <CaretWrapper>
            <Caret />
          </CaretWrapper>
        </ActionsWrapper>
      </SelectBox>
      <OptionsBox show={isOpen}>
        <SearchWrapper>
          <SearchInput
            tabIndex={0}
            name="search"
            type="search"
            value={searchTerm}
            placeholder="Search..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
              filterOptions(e.target.value);
            }}
          />
        </SearchWrapper>
        {renderOptions(!!filteredOptions.length ? filteredOptions : options)}
      </OptionsBox>
    </Container>
  );
};

type ICustomPlaceholderProps = Pick<IProps, 'placeholder'>;

function CustomPlaceholder({
  placeholder = DEFAULT_PLACEHOLDER_COPY,
}: ICustomPlaceholderProps) {
  return <CustomPlaceholderText>{placeholder}</CustomPlaceholderText>;
}

export default MultiSelectWithCheckbox;
