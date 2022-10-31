import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import InvoiceForm from ".";

export default {
  title: "Forms/Lab/InvoiceForm",
  component: InvoiceForm,
  args: {},
} as ComponentMeta<typeof InvoiceForm>;

const Template: ComponentStory<typeof InvoiceForm> = (args) => (
  <InvoiceForm {...args} />
);

export const Story = Template.bind({});
Story.args = {};
