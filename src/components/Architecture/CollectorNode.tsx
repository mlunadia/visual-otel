import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import { Download, Cpu, Upload } from 'lucide-react';

interface CollectorNodeProps {
  x: number;
  y: number;
}

export function CollectorNode({ x, y }: CollectorNodeProps) {
  const { setExpandedPanel } = useAppContext();

  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="w-[500px] p-4 rounded-xl bg-[var(--bg-secondary)] border-2 border-[var(--otel-blue)]/50 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <svg
            viewBox="0 0 100 100"
            className="w-6 h-6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="45" stroke="#4285F4" strokeWidth="4" fill="none" />
            <circle cx="50" cy="25" r="6" fill="#60a5fa" />
            <circle cx="28" cy="65" r="6" fill="#34d399" />
            <circle cx="72" cy="65" r="6" fill="#fbbf24" />
            <line x1="50" y1="31" x2="35" y2="58" stroke="#4285F4" strokeWidth="2" />
            <line x1="50" y1="31" x2="65" y2="58" stroke="#4285F4" strokeWidth="2" />
            <line x1="34" y1="65" x2="66" y2="65" stroke="#4285F4" strokeWidth="2" />
          </svg>
          <h3 className="font-bold text-[var(--text-primary)]">OpenTelemetry Collector</h3>
        </div>

        {/* Pipeline Components */}
        <div className="flex items-center justify-between gap-4">
          {/* Receivers */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setExpandedPanel('receivers')}
            className="flex-1 p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] hover:border-blue-400 transition-colors"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Download className="w-4 h-4 text-blue-400" />
              <span className="font-medium text-sm text-[var(--text-primary)]">Receivers</span>
            </div>
            <div className="space-y-1">
              <ReceiverBadge name="otlp" />
              <ReceiverBadge name="hostmetrics" />
              <ReceiverBadge name="filelog" />
              <ReceiverBadge name="k8s_cluster" />
            </div>
          </motion.button>

          {/* Arrow */}
          <div className="text-[var(--border-color)]">→</div>

          {/* Processors */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setExpandedPanel('processors')}
            className="flex-1 p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] hover:border-green-400 transition-colors"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Cpu className="w-4 h-4 text-green-400" />
              <span className="font-medium text-sm text-[var(--text-primary)]">Processors</span>
            </div>
            <div className="space-y-1">
              <ProcessorBadge name="memory_limiter" />
              <ProcessorBadge name="resourcedetection" />
              <ProcessorBadge name="batch" />
              <ProcessorBadge name="attributes" />
            </div>
          </motion.button>

          {/* Arrow */}
          <div className="text-[var(--border-color)]">→</div>

          {/* Exporters */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setExpandedPanel('exporters')}
            className="flex-1 p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] hover:border-amber-400 transition-colors"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Upload className="w-4 h-4 text-amber-400" />
              <span className="font-medium text-sm text-[var(--text-primary)]">Exporters</span>
            </div>
            <div className="space-y-1">
              <ExporterBadge name="otlp/elastic" />
            </div>
          </motion.button>
        </div>

        {/* Pipeline info */}
        <div className="mt-3 pt-3 border-t border-[var(--border-color)] flex justify-center gap-6 text-xs text-[var(--text-secondary)]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[var(--trace-color)]" />
            traces pipeline
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[var(--metric-color)]" />
            metrics pipeline
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[var(--log-color)]" />
            logs pipeline
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function ReceiverBadge({ name }: { name: string }) {
  return (
    <div className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-400 font-mono">
      {name}
    </div>
  );
}

function ProcessorBadge({ name }: { name: string }) {
  return (
    <div className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-400 font-mono">
      {name}
    </div>
  );
}

function ExporterBadge({ name }: { name: string }) {
  return (
    <div className="text-xs px-2 py-1 rounded bg-amber-500/10 text-amber-400 font-mono">
      {name}
    </div>
  );
}
