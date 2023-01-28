import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import TableWReactVirtualized from "./TableWReactVirtualized";

export default {
  title: "Components/TableWReactVirtualized",
  component: TableWReactVirtualized,
  args: {},
} as ComponentMeta<typeof TableWReactVirtualized>;

const Template: ComponentStory<typeof TableWReactVirtualized> = (args) => (
  <TableWReactVirtualized {...args} />
);

export const Story = Template.bind({});
Story.args = {};
