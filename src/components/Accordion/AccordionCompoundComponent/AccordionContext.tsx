import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';

type AccordionContextType = {
  activeItems: string[];
  toggleItem: (id: string) => void;
  isItemActive: (id: string) => boolean;
};

export const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

type AccordionProviderProps = {
  children: ReactNode;
  allowMultiple?: boolean;
};

export const AccordionProvider = ({
  children,
  allowMultiple = false,
}: AccordionProviderProps) => {
  const [activeItems, setActiveItems] = useState<string[]>([]);

  const toggleItem = useCallback(
    (id: string) => {
      setActiveItems((prevItems) => {
        if (prevItems.includes(id)) {
          return prevItems.filter((item) => item !== id);
        }

        if (allowMultiple) {
          return [...prevItems, id];
        }

        return [id];
      });
    },
    [allowMultiple]
  );

  const isItemActive = useCallback(
    (id: string) => activeItems.includes(id),
    [activeItems]
  );

  const value = useMemo(
    () => ({
      activeItems,
      toggleItem,
      isItemActive,
    }),
    [activeItems, toggleItem, isItemActive]
  );

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
