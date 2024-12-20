import { createContext, useContext, useState, ReactNode } from 'react';

interface AccordionContextType {
  activeItems: string[];
  toggleItem: (id: string) => void;
  isItemActive: (id: string) => boolean;
}

export const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

interface AccordionProviderProps {
  children: ReactNode;
  allowMultiple?: boolean;
}

export const AccordionProvider = ({
  children,
  allowMultiple = false,
}: AccordionProviderProps) => {
  const [activeItems, setActiveItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setActiveItems((prevItems) => {
      if (prevItems.includes(id)) {
        return prevItems.filter((item) => item !== id);
      }

      if (allowMultiple) {
        return [...prevItems, id];
      }

      return [id];
    });
  };

  const isItemActive = (id: string) => activeItems.includes(id);

  const value = {
    activeItems,
    toggleItem,
    isItemActive,
  };

  return (
    <AccordionContext.Provider value={value}>
      {children}
    </AccordionContext.Provider>
  );
};

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error(
      'Accordion compound components must be rendered within an Accordion component'
    );
  }

  return context;
};
