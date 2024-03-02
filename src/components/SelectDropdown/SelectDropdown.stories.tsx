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
    <><SelectDropdown
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
    <SelectDropdown
      selectedRegion={selectedRegion}
      setSelectedRegion={setSelectedRegion}
      options={[
        { value: "Africa", displayValue: "Africa" },
        { value: "America", displayValue: "America" },
        { value: "Asia", displayValue: "Asia" },
        { value: "Europe", displayValue: "Europe" },
        { value: "Oceania", displayValue: "Oceania" },
        { value: "Africa1", displayValue: "Africa1" },
        { value: "America1", displayValue: "America1" },
        { value: "Asia1", displayValue: "Asia1" },
        { value: "Europe1", displayValue: "Europe1" },
        { value: "Oceania1", displayValue: "Oceania1" },
        { value: "Africa2", displayValue: "Africa2" },
        { value: "America2", displayValue: "America2" },
        { value: "Asia2", displayValue: "Asia2" },
        { value: "Europe2", displayValue: "Europe2" },
        { value: "Oceania2", displayValue: "Oceania2" },
      ]}
    /></>
  );
};

export const Primary = Template.bind({});
