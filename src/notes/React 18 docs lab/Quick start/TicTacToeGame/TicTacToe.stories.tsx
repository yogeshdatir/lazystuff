import type { Meta, StoryObj } from '@storybook/react';
import TicTacToe from './TicTacToe';

const meta: Meta<typeof TicTacToe> = {
  component: TicTacToe,
};

export default meta;
type Story = StoryObj<typeof TicTacToe>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'TicTacToe',
  },
};
