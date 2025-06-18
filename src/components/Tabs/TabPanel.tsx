import { ReactNode } from 'react';
import { TabPanelContainer } from './Tabs.styled';
import { useTabsContext } from './TabsContext';

interface Props {
  children: ReactNode;
  value: string;
}
const TabPanel = ({ children, value }: Props) => {
  const { value: selectedValue } = useTabsContext();

  if (value !== selectedValue) return null;

  return (
    <TabPanelContainer aria-labelledby={value} role="tabpanel">
      {children}
    </TabPanelContainer>
  );
};

export default TabPanel;
