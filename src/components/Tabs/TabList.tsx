import { ReactNode } from 'react';
import { TabListContainer } from './Tabs.styled';

interface Props {
  children: ReactNode;
}

const TabList = ({ children }: Props) => {
  return <TabListContainer role="tablist">{children}</TabListContainer>;
};

export default TabList;
