// Tutorial: https://youtu.be/bAJlYgeovlg
// Repo: https://github.com/WebDevSimplified/react-select

import React, { KeyboardEvent, MouseEvent, useRef, useState } from 'react';
import { ReactComponent as CheckedIcon } from '../../../../assets/icons8-done.svg';
import useClickOutside from '../../../../hooks/useClickOutside';
import { useEffect } from 'react';
import {
  ActionsWrapper,
  Caret,
  CaretWrapper,
  ClearButton,
  Container,
  CustomCheckbox,
  CustomPlaceholderText,
  Divider,
  Option,
  OptionsBox,
  SearchInput,
  SearchWrapper,
  SelectBox,
  SelectedOptionBadge,
  SelectedValueText,
} from './MultiSelectWithCheckbox.styled';

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

type IProps = {
  options: ISelectOption[];
  placeholder?: string | number;
} & (SingleSelectProps | MultiSelectProps);

// TODO: Add options groups
// TODO: Add select all for option groups
// TODO: Add async await - lazy loading
// TODO: Bug: Pressing enter on clearOption icon clears the selections but if user presses down arrow and selects option then it doesn't work and dropdown is closed
// TODO: Integrate select all and search features

const DEFAULT_PLACEHOLDER_COPY = `Select an option...`;
const SELECT_ALL_INDEX = 'selectAll';
const MultiSelectWithCheckbox = ({
  multiple,
  value,
  options,
  onChange,
  placeholder = DEFAULT_PLACEHOLDER_COPY,
}: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [hoveredIndex, setHoveredIndex] = useState<number | 'selectAll'>(0);

  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => {
    if (isOpen) setIsOpen(!isOpen);
  });

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [filteredOptions, setFilteredOptions] = useState<ISelectOption[]>([]);

  const [selectAll, setSelectAll] = useState<boolean>(false);

  const isValidSearchTerm = () => {
    return !!searchTerm.trim();
  };

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
          .includes(searchTermArg.toString().trim().toLowerCase())
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
      let updatedSelectedValue = [...value];
      if (!isOptionSelected(option)) {
        updatedSelectedValue = [...value, option];
      } else {
        updatedSelectedValue = value.filter(
          (element: ISelectOption) =>
            JSON.stringify(element) !== JSON.stringify(option)
        );
      }
      onChange(updatedSelectedValue);
    } else {
      if (!isOptionSelected(option)) onChange(option);
    }
  };

  const selectAllOptions = (
    optionsForSelectAll: ISelectOption[],
    syncedSelectAll: boolean
  ) => {
    if (multiple) {
      if (syncedSelectAll) onChange(optionsForSelectAll);
      else onChange([]);
    }
  };

  useEffect(() => {
    if (multiple) {
      setSelectAll(value.length === options.length);
    }
  }, [value, options, multiple]);

  const keyboardHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation();
    switch (event.code) {
      case 'Enter':
      case 'NumpadEnter':
        if (multiple) setIsOpen(true);
        else setIsOpen((prev: boolean) => !prev);
        if (isOpen && typeof hoveredIndex === 'number')
          isValidSearchTerm()
            ? selectOption(filteredOptions[hoveredIndex])
            : selectOption(options[hoveredIndex]);
        else if (isOpen && hoveredIndex === SELECT_ALL_INDEX) {
          selectAllOptions(options, !selectAll);
          setSelectAll((prevSelectAll: boolean) => !prevSelectAll);
        }
        break;

      case 'ArrowUp':
      case 'ArrowDown': {
        if (!isOpen) {
          setIsOpen(true);
          break;
        }

        if (typeof hoveredIndex === 'number') {
          const newHighlightedIndex =
            hoveredIndex + (event.code === 'ArrowDown' ? 1 : -1);
          if (
            newHighlightedIndex >= 0 &&
            newHighlightedIndex < options.length
          ) {
            setHoveredIndex(newHighlightedIndex);
          } else if (hoveredIndex === 0) {
            setHoveredIndex(SELECT_ALL_INDEX);
          }
        } else if (
          hoveredIndex === SELECT_ALL_INDEX &&
          event.code === 'ArrowDown'
        ) {
          setHoveredIndex(0);
        }
        break;
      }

      case 'Escape':
      case 'Tab':
        setIsOpen(false);
        break;

      default: {
        searchInputRef.current?.focus();
      }
    }
  };

  const searchKeyboardHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.code) {
      case 'Enter':
      case 'NumpadEnter':
      case 'ArrowUp':
      case 'ArrowDown':
      case 'Escape':
      case 'Tab': {
        keyboardHandler(event);
        break;
      }
    }
  };

  const renderOptions = (optionList: ISelectOption[]) => {
    return optionList.length ? (
      <>
        {multiple && !isValidSearchTerm() && (
          <Option
            value={SELECT_ALL_INDEX}
            onMouseDown={() => {
              selectAllOptions(optionList, !selectAll);
              setSelectAll((prevSelectAll: boolean) => !prevSelectAll);
            }}
            onMouseEnter={() => {
              setHoveredIndex(SELECT_ALL_INDEX);
            }}
            isHighlightedIndex={hoveredIndex === SELECT_ALL_INDEX}
          >
            <CustomCheckbox role="checkbox" aria-checked={false}>
              {selectAll && <CheckedIcon />}
            </CustomCheckbox>
            Select All
          </Option>
        )}
        {optionList.map((option: ISelectOption, index: number) => {
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
              isHighlightedIndex={hoveredIndex === index}
            >
              <CustomCheckbox role="checkbox" aria-checked={false}>
                {isOptionSelected(option) && <CheckedIcon />}
              </CustomCheckbox>
              {option.label}
            </Option>
          );
        })}
      </>
    ) : (
      <Option style={{ cursor: 'auto' }}>No options available</Option>
    );
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
              <CustomPlaceholder placeholder={placeholder} />
            )
          ) : (
            value?.label || <CustomPlaceholder placeholder={placeholder} />
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
            ref={searchInputRef}
            tabIndex={0}
            name="search"
            type="search"
            value={searchTerm}
            placeholder="Search..."
            onChange={(e) => {
              const inputValue = e.target.value;
              setSearchTerm(inputValue);
              filterOptions(inputValue);
            }}
            onKeyDown={searchKeyboardHandler}
          />
        </SearchWrapper>
        {renderOptions(isValidSearchTerm() ? filteredOptions : options)}
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
