import { Meta } from "@storybook/react";
import Checkbox from "./index";

const meta: Meta = {
  title: "Inputs/Checkbox",
  component: Checkbox,
};

export default meta;

const Template = () => {
  return <Checkbox />;
};

export const Primary = Template.bind({});
