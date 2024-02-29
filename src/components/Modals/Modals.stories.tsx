import type { Meta, StoryObj } from '@storybook/react';

import Modals from './index';

const meta: Meta = {
  component: Modals,
};

export default meta;
type Story = StoryObj<typeof meta>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <Modals />,
};