import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import MultiStepForm from ".";

export default {
  title: "Forms/MultiStepForm",
  component: MultiStepForm,
  args: {},
} as ComponentMeta<typeof MultiStepForm>;

const Template: ComponentStory<typeof MultiStepForm> = (args) => (
  <MultiStepForm {...args} />
);

export const Story = Template.bind({});
Story.args = {};
