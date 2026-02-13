import { motion } from 'framer-motion';
import { Server, HardDrive, Container } from 'lucide-react';

interface InfraNodeProps {
  type: 'vm' | 'k8s' | 'logs';
  name: string;
  metrics: string[];
  x: number;
  y: number;
}

const icons = {
  vm: Server,
  k8s: Container,
  logs: HardDrive,
};

export function InfraNode({ type, name, metrics, x, y }: InfraNodeProps) {
  const Icon = icons[type];

  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="w-[140px] p-3 rounded-lg bg-[var(--bg-tertiary)]/50 border border-[var(--border-color)]/50 backdrop-blur">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-4 h-4 text-[var(--metric-color)]" />
          <span className="text-xs font-medium text-[var(--text-primary)]">{name}</span>
        </div>
        <div className="space-y-1">
          {metrics.map((metric) => (
            <div
              key={metric}
              className="text-[10px] text-[var(--text-secondary)] flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--metric-color)]" />
              {metric}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
