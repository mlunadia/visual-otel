import { motion } from 'framer-motion';
import { exampleCounters, exampleGauges, exampleHistogram, metricTypeExplanations } from '../../data/exampleMetrics';
import { InsightCard } from '../UI/InsightCard';
import { TrendingUp, Gauge, BarChart3 } from 'lucide-react';

export function MetricsPanel() {
  return (
    <div className="space-y-6">
      {/* Introduction */}
      <p className="text-[var(--text-secondary)] leading-relaxed">
        <strong className="text-[var(--text-primary)]">Metrics</strong> are numerical measurements 
        collected over time. OTel supports three metric types, each optimized for different use cases.
      </p>

      {/* Metric Types */}
      <div className="space-y-4">
        {/* Counter */}
        <MetricTypeCard
          icon={<TrendingUp className="w-5 h-5" />}
          type={metricTypeExplanations.counter}
          color="var(--metric-color)"
        >
          <div className="mt-3 p-3 bg-[var(--bg-tertiary)] rounded-lg">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-sm text-[var(--text-secondary)]">
                {exampleCounters[0].name}
              </span>
              <motion.span
                className="text-2xl font-bold text-[var(--metric-color)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {exampleCounters[0].value.toLocaleString()}
              </motion.span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              {exampleCounters[0].description}
            </p>
          </div>
        </MetricTypeCard>

        {/* Gauge */}
        <MetricTypeCard
          icon={<Gauge className="w-5 h-5" />}
          type={metricTypeExplanations.gauge}
          color="#8b5cf6"
        >
          <div className="mt-3 p-3 bg-[var(--bg-tertiary)] rounded-lg">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-sm text-[var(--text-secondary)]">
                cpu_utilization
              </span>
              <span className="text-2xl font-bold text-purple-400">
                {exampleGauges[0].value}%
              </span>
            </div>
            <div className="mt-2 h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${exampleGauges[0].value}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-purple-400 rounded-full"
              />
            </div>
          </div>
        </MetricTypeCard>

        {/* Histogram */}
        <MetricTypeCard
          icon={<BarChart3 className="w-5 h-5" />}
          type={metricTypeExplanations.histogram}
          color="#f472b6"
        >
          <div className="mt-3 p-3 bg-[var(--bg-tertiary)] rounded-lg">
            <div className="font-mono text-sm text-[var(--text-secondary)] mb-2">
              {exampleHistogram.name}
            </div>
            
            {/* Simple histogram visualization */}
            <div className="flex items-end gap-1 h-16 mb-2">
              {exampleHistogram.buckets.slice(0, -1).map((bucket, i) => {
                const prevCount = i > 0 ? exampleHistogram.buckets[i - 1].count : 0;
                const bucketCount = bucket.count - prevCount;
                const height = (bucketCount / exampleHistogram.count) * 100;
                return (
                  <motion.div
                    key={bucket.le}
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(height * 4, 4)}%` }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex-1 bg-pink-400 rounded-t opacity-80"
                    title={`≤${bucket.le}ms: ${bucketCount}`}
                  />
                );
              })}
            </div>
            
            {/* Percentiles */}
            <div className="flex justify-between text-xs">
              <span className="text-[var(--text-secondary)]">
                p50: <span className="text-pink-400">{exampleHistogram.percentiles.p50}ms</span>
              </span>
              <span className="text-[var(--text-secondary)]">
                p95: <span className="text-pink-400">{exampleHistogram.percentiles.p95}ms</span>
              </span>
              <span className="text-[var(--text-secondary)]">
                p99: <span className="text-pink-400">{exampleHistogram.percentiles.p99}ms</span>
              </span>
            </div>
          </div>
        </MetricTypeCard>
      </div>

      {/* Insight */}
      <InsightCard title="Metric Aggregation" variant="info">
        <p>
          OTel SDKs aggregate metrics in-memory before exporting, reducing network overhead. 
          The Collector can further aggregate across instances.
        </p>
      </InsightCard>

      {/* Attributes */}
      <div className="space-y-3">
        <h3 className="font-medium text-[var(--text-primary)]">Metric Attributes</h3>
        <p className="text-sm text-[var(--text-secondary)]">
          Attributes add dimensions to metrics, enabling filtering and grouping:
        </p>
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3 font-mono text-xs space-y-1">
          {Object.entries(exampleCounters[0].attributes).map(([key, value]) => (
            <div key={key}>
              <span className="text-cyan-400">{key}</span>
              <span className="text-gray-400">: </span>
              <span className="text-amber-300">"{value}"</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricTypeCard({
  icon,
  type,
  color,
  children,
}: {
  icon: React.ReactNode;
  type: typeof metricTypeExplanations.counter;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]"
    >
      <div className="flex items-center gap-3 mb-2">
        <div style={{ color }} className="p-2 rounded-lg bg-[var(--bg-tertiary)]">
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-[var(--text-primary)]">{type.name}</h4>
          <p className="text-xs text-[var(--text-secondary)]">{type.useCase}</p>
        </div>
      </div>
      <p className="text-sm text-[var(--text-secondary)]">{type.description}</p>
      {children}
    </motion.div>
  );
}
