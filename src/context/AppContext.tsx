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
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeSignal, setActiveSignal] = useState<Signal>('all');
  const [expandedPanel, setExpandedPanel] = useState<ExpandedPanel>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768 ? false : true
  );

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Wrapper that also opens sidebar when a panel is selected
  const handleSetExpandedPanel = (panel: ExpandedPanel) => {
    setExpandedPanel(panel);
    if (panel !== null) {
      setSidebarOpen(true);
    }
  };

  // Wrapper that also opens sidebar when a signal is selected
  const handleSetActiveSignal = (signal: Signal) => {
    setActiveSignal(signal);
    setExpandedPanel(null); // Clear any expanded panel to show signal content
    setSidebarOpen(true);
  };

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      activeSignal,
      setActiveSignal: handleSetActiveSignal,
      expandedPanel,
      setExpandedPanel: handleSetExpandedPanel,
      isAnimating,
      setIsAnimating,
      sidebarOpen,
      setSidebarOpen,
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
