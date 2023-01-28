import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import HTMLTable from "./HTMLTable";

export default {
  title: "Components/HTMLTable",
  component: HTMLTable,
  args: {},
} as ComponentMeta<typeof HTMLTable>;

const Template: ComponentStory<typeof HTMLTable> = (args) => (
  <HTMLTable {...args} />
);

export const Story = Template.bind({});
Story.args = {};
