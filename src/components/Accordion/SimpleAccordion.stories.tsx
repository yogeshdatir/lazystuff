import type { Meta, StoryObj } from '@storybook/react';
import SimpleAccordion from './SimpleAccordion';
import Accordion from '.';

const meta: Meta<typeof SimpleAccordion> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/Simple Accordion',
  component: SimpleAccordion,
};

export default meta;
type Story = StoryObj<typeof SimpleAccordion>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <SimpleAccordion />,
};

export const AccordionStory: StoryObj<typeof Accordion> = {
  render: () => (
    <Accordion
      title="What is the maximum file upload size?"
      content="No more than 2GB. All files in your account must fit your allotted storage space."
    />
  ),
  parameters: {
    docs: {
      canvas: { sourceState: 'shown' },
      source: {
        code: `
              /* test */
              <Accordion
                title="What is the maximum file upload size?"
                content="No more than 2GB. All files in your account must fit your allotted storage space."
              />`,
        format: 'dedent',
      },
    },
  },
};
