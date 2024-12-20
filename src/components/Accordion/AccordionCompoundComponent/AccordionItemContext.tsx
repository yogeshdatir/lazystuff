import { createContext, useContext, ReactNode } from 'react';

interface AccordionItemContextType {
  value: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const AccordionItemContext = createContext<
  AccordionItemContextType | undefined
>(undefined);

interface AccordionItemProviderProps {
  children: ReactNode;
  value: string;
  isExpanded: boolean;
  onToggle: () => void;
}

export const AccordionItemProvider = ({
  children,
  value,
  isExpanded,
  onToggle,
}: AccordionItemProviderProps) => {
  const state = {
    value,
    isExpanded,
    onToggle,
  };

  return (
    <AccordionItemContext.Provider value={state}>
      {children}
    </AccordionItemContext.Provider>
  );
};

export const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);

  if (!context) {
    throw new Error(
      'AccordionItem compound components must be rendered within an AccordionItem component'
    );
  }

  return context;
};
