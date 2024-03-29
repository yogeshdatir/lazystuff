import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import TableWReactWindow from './TableWReactWindow';

export default {
  title: 'Components/TableWReactWindow',
  component: TableWReactWindow,
  args: {},
} as ComponentMeta<typeof TableWReactWindow>;

const Template: ComponentStory<typeof TableWReactWindow> = (args) => (
  <TableWReactWindow />
);

export const Story = Template.bind({});
Story.args = {};
