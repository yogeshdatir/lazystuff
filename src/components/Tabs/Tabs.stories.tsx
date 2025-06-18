import { Meta, StoryObj } from '@storybook/react';
import Tabs from './Tabs';
import { useState } from 'react';

const meta: Meta<typeof Tabs> = {
  title: 'Interview Prep/Components/Tabs',
  component: Tabs,
};

export default meta;

const TabsExample = () => {
  const [value, setValue] = useState('t1');

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const { TabList, Tab, TabPanel } = Tabs;

  return (
    <Tabs value={value} onChange={handleChange}>
      <TabList>
        <Tab value="t1">Tab 1</Tab>
        <Tab value="t2">Tab 2</Tab>
        <Tab value="t3">Tab 3</Tab>
        <Tab value="t4">Tab 4</Tab>
      </TabList>
      <TabPanel value="t1">Tab 1 Content</TabPanel>
      <TabPanel value="t2">Tab 2 Content</TabPanel>
      <TabPanel value="t3">Tab 3 Content</TabPanel>
      <TabPanel value="t4">Tab 4 Content</TabPanel>
    </Tabs>
  );
};

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: TabsExample,
};
