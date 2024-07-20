import type { Meta, StoryObj } from '@storybook/react';
import SkeletonLoader from '.';

const meta: Meta = {
  component: SkeletonLoader,
};

export default meta;
type Story = StoryObj<typeof meta>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const SkeletonLoaderStory: Story = {
  render: (args) => <SkeletonLoader {...args} />,
};

SkeletonLoaderStory.args = {};
