import { Meta } from "@storybook/react";
import Toggle from "./index";

const meta: Meta = {
  title: "Inputs/Toggle",
  component: Toggle,
};

export default meta;

const Template = () => {
  return <Toggle />;
};

export const Primary = Template.bind({});
