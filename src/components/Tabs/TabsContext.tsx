import { createContext, ReactNode, useContext } from 'react';
import { TabsProps } from './Tabs';

interface TabContextState {
  value: TabsProps['value'];
  onChange: TabsProps['onChange'];
}

const TabsContext = createContext<TabContextState | null>(null);

type TabsContextProviderProps = {
  children: ReactNode;
  value: TabsProps['value'];
  onChange: TabsProps['onChange'];
};

const TabsContextProvider = ({
  children,
  value,
  onChange,
}: TabsContextProviderProps) => {
  const tabContextState = {
    value,
    onChange,
  };

  return (
    <TabsContext.Provider value={tabContextState}>
      {children}
    </TabsContext.Provider>
  );
};

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (context === null) {
    throw new Error('useTabsContext must be used within TabsContextProvider.');
  }
  return context;
};

export { TabsContextProvider, useTabsContext };
