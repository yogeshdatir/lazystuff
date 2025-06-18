import { ReactNode } from 'react';
import Tab from './Tab';
import TabList from './TabList';
import TabPanel from './TabPanel';
import { TabsContextProvider } from './TabsContext';

export interface TabsProps {
  children: ReactNode;
  value: string;
  onChange: (e: React.SyntheticEvent, newValue: string) => void;
}

const Tabs = ({ children, value, onChange }: TabsProps) => {
  return (
    <TabsContextProvider value={value} onChange={onChange}>
      <div>{children}</div>
    </TabsContextProvider>
  );
};

Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanel = TabPanel;

export default Tabs;
