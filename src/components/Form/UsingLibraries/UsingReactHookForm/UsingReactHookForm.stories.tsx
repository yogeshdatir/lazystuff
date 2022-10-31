import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import UsingReactHookForm from ".";

export default {
  title: "Forms/UsingReactHookForm",
  component: UsingReactHookForm,
  args: {},
} as ComponentMeta<typeof UsingReactHookForm>;

const Template: ComponentStory<typeof UsingReactHookForm> = (args) => (
  <UsingReactHookForm {...args} />
);

export const Story = Template.bind({});
Story.args = {};
