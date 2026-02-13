import { motion } from 'framer-motion';
import { Activity, BarChart3, FileText, Layers } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

type Signal = 'traces' | 'metrics' | 'logs' | 'all';

const tabs: { id: Signal; label: string; icon: React.ReactNode; color: string }[] = [
  { id: 'all', label: 'All Signals', icon: <Layers className="w-4 h-4" />, color: 'var(--text-primary)' },
  { id: 'traces', label: 'Traces', icon: <Activity className="w-4 h-4" />, color: 'var(--trace-color)' },
  { id: 'metrics', label: 'Metrics', icon: <BarChart3 className="w-4 h-4" />, color: 'var(--metric-color)' },
  { id: 'logs', label: 'Logs', icon: <FileText className="w-4 h-4" />, color: 'var(--log-color)' },
];

export function SignalTabs() {
  const { activeSignal, setActiveSignal } = useAppContext();

  return (
    <div className="flex gap-2 p-1 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => setActiveSignal(tab.id)}
          className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeSignal === tab.id
              ? 'text-[var(--text-primary)]'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {activeSignal === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 rounded-lg bg-[var(--bg-tertiary)]"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10" style={{ color: activeSignal === tab.id ? tab.color : 'inherit' }}>
            {tab.icon}
          </span>
          <span className="relative z-10">{tab.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
