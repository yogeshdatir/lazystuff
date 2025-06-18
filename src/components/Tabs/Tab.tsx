import { ReactNode, SyntheticEvent } from 'react';
import { TabButton } from './Tabs.styled';
import { useTabsContext } from './TabsContext';

interface Props {
  children: ReactNode;
  value: string;
}

const Tab = ({ children, value }: Props) => {
  const { value: selectedValue, onChange } = useTabsContext();

  const handleTabClick = (e: SyntheticEvent) => {
    onChange(e, value);
  };

  const isCurrentTabSelected = value === selectedValue;

  return (
    <TabButton
      id={value}
      aria-selected={isCurrentTabSelected}
      onClick={handleTabClick}
    >
      {children}
    </TabButton>
  );
};

export default Tab;
