import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { TracesPanel } from '../Panels/TracesPanel';
import { MetricsPanel } from '../Panels/MetricsPanel';
import { LogsPanel } from '../Panels/LogsPanel';
import { CollectorPanel } from '../Panels/CollectorPanel';
import { SdkPanel } from '../Panels/SdkPanel';
import { SemConvPanel } from '../Panels/SemConvPanel';
import { ResourceDetectionPanel } from '../Panels/ResourceDetectionPanel';

export function Sidebar() {
  const { expandedPanel, setExpandedPanel, activeSignal } = useAppContext();

  const getPanelContent = () => {
    // If a specific panel is expanded, show it
    if (expandedPanel) {
      switch (expandedPanel) {
        case 'sdk':
          return <SdkPanel />;
        case 'collector':
        case 'receivers':
        case 'processors':
        case 'exporters':
          return <CollectorPanel focusedComponent={expandedPanel} />;
        case 'semconv':
          return <SemConvPanel />;
        case 'resource':
          return <ResourceDetectionPanel />;
      }
    }
    
    // Otherwise show panel based on active signal
    switch (activeSignal) {
      case 'traces':
        return <TracesPanel />;
      case 'metrics':
        return <MetricsPanel />;
      case 'logs':
        return <LogsPanel />;
      default:
        return <OverviewPanel />;
    }
  };

  const getPanelTitle = () => {
    if (expandedPanel) {
      const titles: Record<string, string> = {
        sdk: 'OpenTelemetry SDK',
        collector: 'OTel Collector',
        receivers: 'Collectors - Receivers',
        processors: 'Collector - Processors',
        exporters: 'Collector - Exporters',
        semconv: 'Semantic Conventions',
        resource: 'Resource Detection',
      };
      return titles[expandedPanel];
    }
    
    const signalTitles: Record<string, string> = {
      traces: 'Distributed Traces',
      metrics: 'Metrics',
      logs: 'Logs',
      all: 'Overview',
    };
    return signalTitles[activeSignal];
  };

  return (
    <motion.aside
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed right-0 top-20 bottom-0 w-[500px] glass border-l border-[var(--border-color)] overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)]">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
          {getPanelTitle()}
        </h2>
        {expandedPanel && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setExpandedPanel(null)}
            className="p-1.5 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
          >
            <X className="w-5 h-5 text-[var(--text-secondary)]" />
          </motion.button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={expandedPanel || activeSignal}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {getPanelContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}

function OverviewPanel() {
  const { setExpandedPanel } = useAppContext();
  
  const concepts = [
    {
      id: 'sdk' as const,
      title: 'OTel SDK',
      description: 'Instrumentation library in your application',
      color: 'var(--otel-blue)',
    },
    {
      id: 'collector' as const,
      title: 'OTel Collector',
      description: 'Process and route telemetry data',
      color: 'var(--otel-blue)',
    },
    {
      id: 'semconv' as const,
      title: 'Semantic Conventions',
      description: 'Standardized attribute names',
      color: 'var(--otel-blue)',
    },
    {
      id: 'resource' as const,
      title: 'Resource Detection',
      description: 'Automatic environment context',
      color: 'var(--otel-blue)',
    },
  ];

  return (
    <div className="space-y-6">
      <p className="text-[var(--text-secondary)] leading-relaxed">
        Click on any component in the diagram to learn more, or explore the key concepts below.
      </p>
      
      <div className="grid gap-3">
        {concepts.map((concept) => (
          <motion.button
            key={concept.id}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setExpandedPanel(concept.id)}
            className="flex items-center gap-4 p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-left hover:border-[var(--otel-blue)] transition-colors"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: concept.color }}
            />
            <div>
              <h3 className="font-medium text-[var(--text-primary)]">{concept.title}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{concept.description}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="pt-4 border-t border-[var(--border-color)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-3">Signal Types</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--trace-color)' }} />
            <span className="text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">Traces</strong> - Request flow across services
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--metric-color)' }} />
            <span className="text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">Metrics</strong> - Numerical measurements over time
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--log-color)' }} />
            <span className="text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">Logs</strong> - Discrete events with context
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
