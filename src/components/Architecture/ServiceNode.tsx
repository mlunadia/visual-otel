import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import { Code2 } from 'lucide-react';

interface ServiceNodeProps {
  name: string;
  technology: string;
  x: number;
  y: number;
  onClick?: () => void;
}

export function ServiceNode({ name, technology, x, y, onClick }: ServiceNodeProps) {
  const { setExpandedPanel } = useAppContext();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setExpandedPanel('sdk');
    }
  };

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ left: x, top: y }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
    >
      <div className="w-[160px] p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--otel-blue)] transition-colors shadow-lg">
        {/* Service Name */}
        <div className="text-center mb-3">
          <h3 className="font-semibold text-[var(--text-primary)] text-sm">{name}</h3>
          <p className="text-xs text-[var(--text-secondary)]">{technology}</p>
        </div>

        {/* OTel SDK Badge */}
        <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-[var(--otel-blue)]/10 border border-[var(--otel-blue)]/30">
          <Code2 className="w-3 h-3 text-[var(--otel-blue)]" />
          <span className="text-xs font-medium text-[var(--otel-blue)]">OTel SDK</span>
        </div>

        {/* Signal indicators */}
        <div className="flex justify-center gap-2 mt-3">
          <SignalDot color="var(--trace-color)" label="T" />
          <SignalDot color="var(--metric-color)" label="M" />
          <SignalDot color="var(--log-color)" label="L" />
        </div>
      </div>
    </motion.div>
  );
}

function SignalDot({ color, label }: { color: string; label: string }) {
  return (
    <div
      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
      style={{ backgroundColor: `${color}30`, color }}
    >
      {label}
    </div>
  );
}
