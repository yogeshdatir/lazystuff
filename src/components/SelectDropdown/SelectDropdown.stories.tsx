import { Meta } from "@storybook/react";
import React, { useState } from "react";
import SelectDropdown from ".";

const meta: Meta = {
  title: "Dropdowns/Single Select Dropdown",
  component: SelectDropdown,
};

export default meta;

const Template = () => {
  // Sets the hooks for both the label and primary props
  const [selectedRegion, setSelectedRegion] = useState("Filter by Region");

  return (
    <SelectDropdown
      selectedRegion={selectedRegion}
      setSelectedRegion={setSelectedRegion}
      options={[
        { value: "Africa", displayValue: "Africa" },
        { value: "America", displayValue: "America" },
        { value: "Asia", displayValue: "Asia" },
        { value: "Europe", displayValue: "Europe" },
        { value: "Oceania", displayValue: "Oceania" },
      ]}
    />
  );
};

export const Primary = Template.bind({});
