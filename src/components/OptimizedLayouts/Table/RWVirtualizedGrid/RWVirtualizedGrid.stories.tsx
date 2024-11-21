import type { Meta, StoryObj } from '@storybook/react';
import RWVirtualizedGrid from './RWVirtualizedGrid';

const meta: Meta<typeof RWVirtualizedGrid> = {
  title: 'Components/OptimizedLayout/RWVirtualizedGrid',
  component: RWVirtualizedGrid,
};

export default meta;

type Story = StoryObj<typeof RWVirtualizedGrid>;
export const Primary: Story = {
  render: () => <RWVirtualizedGrid />,
};
