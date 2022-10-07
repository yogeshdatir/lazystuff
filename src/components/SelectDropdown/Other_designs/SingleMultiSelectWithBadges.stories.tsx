import { Meta } from "@storybook/react";
import React, { useState } from "react";
import SingleMultiSelectWithBadges, {
  ISelectOption,
} from "./SingleMultiSelectWithBadges";

const meta: Meta = {
  title: "Dropdowns/Single_Multi Select Dropdown Design 2",
  component: SingleMultiSelectWithBadges,
};

export default meta;

const options: ISelectOption[] = [
  { label: "Mumbai", value: 1 },
  { label: "Delhi", value: 2 },
  { label: "Pune", value: 3 },
  { label: "Nagpur", value: 4 },
  { label: "Amravati", value: 5 },
];

const Template = () => {
  // Sets the hooks for both the label and primary props
  const [selectedValue1, setSelectedValue1] = useState<
    ISelectOption | undefined
  >(options[0]);
  const [selectedValue2, setSelectedValue2] = useState<ISelectOption[]>([
    options[0],
  ]);

  return (
    <>
      <SingleMultiSelectWithBadges
        value={selectedValue1}
        options={options}
        onChange={(value) => {
          setSelectedValue1(value);
        }}
      />
      <br />
      <SingleMultiSelectWithBadges
        multiple={true}
        value={selectedValue2}
        options={options}
        onChange={(value) => {
          setSelectedValue2(value);
        }}
      />
    </>
  );
};

export const Primary = Template.bind({});
