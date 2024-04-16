import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for component info
interface ComponentInfo {
  index: number;
  name: string;
  title: string;
  address: string;
  description: string;
}

// Define type for context value
interface SelectedComponentContextType {
  selectedComponent: ComponentInfo | null;
  setSelected: (componentInfo: ComponentInfo | null) => void;
}

// Context to manage selected component state
const SelectedComponentContext = createContext<SelectedComponentContextType | null>(null);

// Custom hook to access and update selected component state
export const useSelectedComponent = (): SelectedComponentContextType => {
  const context = useContext(SelectedComponentContext);
  if (!context) {
    throw new Error('useSelectedComponent must be used within a SelectedComponentProvider');
  }
  return context;
};

// Provider component to manage the selected component state
interface SelectedComponentProviderProps {
  children: ReactNode;
}
export const SelectedComponentProvider: React.FC<SelectedComponentProviderProps> = ({ children }) => {
  const [selectedComponent, setSelectedComponent] = useState<ComponentInfo | null>(null);

  const setSelected = (componentInfo: ComponentInfo | null) => {
    setSelectedComponent(componentInfo);
  };

  const contextValue: SelectedComponentContextType = {
    selectedComponent,
    setSelected,
  };

  return (
    <SelectedComponentContext.Provider value={contextValue}>
      {children}
    </SelectedComponentContext.Provider>
  );
};
