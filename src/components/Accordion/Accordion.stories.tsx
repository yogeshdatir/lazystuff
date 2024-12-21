import { Meta, StoryObj } from '@storybook/react';
import SimpleAccordion from './SimpleAccordion/SimpleAccordion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import CompoundAccordion from './CompoundAccordion';

const meta: Meta<typeof SimpleAccordion> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/Accordion',
  component: SimpleAccordion,
};

export default meta;
type PrimaryStory = StoryObj<typeof SimpleAccordion>;
type ShadcnStory = StoryObj<typeof Accordion>;
type CustomAccordionWCompoundComponentStory = StoryObj<
  typeof CompoundAccordion
>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: PrimaryStory = {
  render: () => <SimpleAccordion />,
};

export const Shadcn: ShadcnStory = {
  render: () => {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It's animated by default, but you can disable it if you prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  },
};

export const CustomAccordionWithCompoundComponent: CustomAccordionWCompoundComponentStory =
  {
    render: () => {
      return <CompoundAccordion />;
    },
  };
