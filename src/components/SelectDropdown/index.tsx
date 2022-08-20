import React, { useRef, useState } from "react";
import {
  ArrowIcon,
  Dropdown,
  OptionItem,
  OptionsBox,
  SelectBox,
} from "./SelectDropdown.styled";
import ArrowPng from "../../assets/icons8-expand-arrow-50 dark.png";
// import ArrowPngLight from "../../assets/icons8-expand-arrow-50.png";
import useClickOutside from "../../hooks/useClickOutside";

export interface IOption {
  value: string | number;
  displayValue: string | number;
}

interface IProps {
  selectedRegion: string | number;
  setSelectedRegion: any;
  options: IOption[];
}

const Select = ({ selectedRegion, setSelectedRegion, options }: IProps) => {
  const [isActive, setIsActive] = useState(false);

  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => {
    if (isActive) setIsActive(!isActive);
  });

  const handleDropdownClick = () => {
    setIsActive(!isActive);
  };

  return (
    <Dropdown
      data-testid="select-container"
      ref={wrapperRef}
      onClick={handleDropdownClick}
    >
      <SelectBox data-testid="select-field">
        <span>{selectedRegion}</span>
        <ArrowIcon isActive={isActive} src={ArrowPng} alt="expand" />
      </SelectBox>
      <OptionsBox data-testid="options-box" isActive={isActive}>
        {options?.map(({ value, displayValue }) => {
          return (
            <OptionItem
              key={value}
              onClick={() => setSelectedRegion(value)}
              value={value}
              selectedOption={value === selectedRegion}
            >
              {displayValue}
            </OptionItem>
          );
        })}
      </OptionsBox>
    </Dropdown>
  );
};

export default Select;
