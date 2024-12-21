import { createContext, useContext, ReactNode, useMemo } from 'react';

type AccordionItemContextType = {
  value: string;
  isExpanded: boolean;
  onToggle: () => void;
};

const AccordionItemContext = createContext<
  AccordionItemContextType | undefined
>(undefined);

type AccordionItemProviderProps = {
  children: ReactNode;
  value: string;
  isExpanded: boolean;
  onToggle: () => void;
};

/**
 * Context provider for individual accordion items
 * @param props.value - Unique identifier for the accordion item
 * @param props.isExpanded - Whether the accordion item is expanded
 * @param props.onToggle - Callback to toggle the accordion item
 */
export const AccordionItemProvider = ({
  children,
  value,
  isExpanded,
  onToggle,
}: AccordionItemProviderProps) => {
  const state = useMemo(
    () => ({
      value,
      isExpanded,
      onToggle,
    }),
    [value, isExpanded, onToggle]
  );

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
