import { Meta, StoryObj } from '@storybook/react';

import DialogModal from './DialogModal';

const meta: Meta = {
  component: DialogModal,
};

export default meta;
type Story = StoryObj<typeof meta>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const HTMLDialogModal: Story = {
  render: (args) => <DialogModal {...args} />,
};

HTMLDialogModal.args = {
  variant: 'withButtonFormMethod',
};
