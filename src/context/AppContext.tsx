import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Signal = 'traces' | 'metrics' | 'logs' | 'all';
type ExpandedPanel = 'sdk' | 'collector' | 'receivers' | 'processors' | 'exporters' | 'semconv' | 'resource' | null;

interface AppContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  activeSignal: Signal;
  setActiveSignal: (signal: Signal) => void;
  expandedPanel: ExpandedPanel;
  setExpandedPanel: (panel: ExpandedPanel) => void;
  isAnimating: boolean;
  setIsAnimating: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeSignal, setActiveSignal] = useState<Signal>('all');
  const [expandedPanel, setExpandedPanel] = useState<ExpandedPanel>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      activeSignal,
      setActiveSignal,
      expandedPanel,
      setExpandedPanel,
      isAnimating,
      setIsAnimating,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
