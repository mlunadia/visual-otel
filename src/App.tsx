import { AppProvider, useAppContext } from './context/AppContext';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { MainDiagram } from './components/Architecture/MainDiagram';

function AppContent() {
  const { sidebarOpen } = useAppContext();
  
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Header />
      
      {/* Main content area - horizontal scrollable */}
      <main className={`pt-20 min-h-screen transition-all duration-300 ${sidebarOpen ? 'pr-[500px]' : 'pr-0'}`}>
        <div className="p-4 overflow-x-auto">
          <MainDiagram />
        </div>
      </main>

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
