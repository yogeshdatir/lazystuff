import { Meta } from "@storybook/react";
import React, { useState } from "react";
import SelectD2, { SelectOption } from "./SelectD2";

const meta: Meta = {
  title: "Dropdowns/Single Select Dropdown Design 2",
  component: SelectD2,
};

export default meta;

const options: SelectOption[] = [
  { label: "Mumbai", value: 1 },
  { label: "Delhi", value: 2 },
  { label: "Pune", value: 3 },
  { label: "Nagpur", value: 4 },
  { label: "Amravati", value: 5 },
];

const Template = () => {
  // Sets the hooks for both the label and primary props
  const [selectedValue, setSelectedValue] = useState<SelectOption | undefined>(
    options[0]
  );

  return (
    <SelectD2
      value={selectedValue}
      options={options}
      onChange={(value) => {
        setSelectedValue(value);
      }}
    />
  );
};

export const Primary = Template.bind({});
