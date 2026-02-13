import { AppProvider } from './context/AppContext';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { MainDiagram } from './components/Architecture/MainDiagram';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[var(--bg-primary)]">
        <Header />
        
        {/* Main content area - horizontal scrollable */}
        <main className="pt-20 pr-[500px] min-h-screen">
          <div className="p-4 overflow-x-auto">
            <MainDiagram />
          </div>
        </main>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </AppProvider>
  );
}

export default App;
