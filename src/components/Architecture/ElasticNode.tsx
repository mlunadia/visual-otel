import { motion } from 'framer-motion';
import { Activity, BarChart3, FileText, Database } from 'lucide-react';

interface ElasticNodeProps {
  x: number;
  y: number;
}

export function ElasticNode({ x, y }: ElasticNodeProps) {
  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-[500px] p-4 rounded-xl bg-gradient-to-br from-[#00bfb3]/10 to-[#f04e98]/10 border border-[#00bfb3]/30 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Database className="w-5 h-5 text-[#00bfb3]" />
          <h3 className="font-bold text-[var(--text-primary)]">Elastic Observability</h3>
        </div>

        {/* Data stores */}
        <div className="flex items-center justify-center gap-4">
          <DataStore
            icon={<Activity className="w-5 h-5" />}
            name="APM"
            description="Traces & Spans"
            color="#60a5fa"
          />
          <DataStore
            icon={<BarChart3 className="w-5 h-5" />}
            name="Metrics"
            description="Time Series"
            color="#34d399"
          />
          <DataStore
            icon={<FileText className="w-5 h-5" />}
            name="Logs"
            description="Log Records"
            color="#fbbf24"
          />
        </div>

        {/* OTLP endpoint info */}
        <div className="mt-4 pt-3 border-t border-[var(--border-color)]/30 text-center">
          <p className="text-xs text-[var(--text-secondary)]">
            Receiving via <span className="font-mono text-[#00bfb3]">OTLP</span> protocol
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function DataStore({
  icon,
  name,
  description,
  color,
}: {
  icon: React.ReactNode;
  name: string;
  description: string;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex-1 p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]"
    >
      <div className="flex flex-col items-center text-center">
        <div
          className="p-2 rounded-lg mb-2"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {icon}
        </div>
        <span className="font-medium text-sm text-[var(--text-primary)]">{name}</span>
        <span className="text-xs text-[var(--text-secondary)]">{description}</span>
      </div>
    </motion.div>
  );
}
