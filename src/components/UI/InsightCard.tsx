import { motion } from 'framer-motion';
import { Lightbulb, X } from 'lucide-react';
import type { ReactNode } from 'react';

interface InsightCardProps {
  title: string;
  children: ReactNode;
  onClose?: () => void;
  variant?: 'info' | 'tip' | 'warning';
}

const variants = {
  info: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    icon: 'text-blue-400',
  },
  tip: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    icon: 'text-amber-400',
  },
  warning: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    icon: 'text-orange-400',
  },
};

export function InsightCard({ title, children, onClose, variant = 'tip' }: InsightCardProps) {
  const style = variants[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`rounded-lg p-4 ${style.bg} border ${style.border}`}
    >
      <div className="flex items-start gap-3">
        <Lightbulb className={`w-5 h-5 mt-0.5 ${style.icon} flex-shrink-0`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-[var(--text-primary)]">{title}</h4>
            {onClose && (
              <button
                onClick={onClose}
                className="p-1 rounded hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                <X className="w-4 h-4 text-[var(--text-secondary)]" />
              </button>
            )}
          </div>
          <div className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
