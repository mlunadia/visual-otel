import { motion } from 'framer-motion';
import { receivers, processors, exporters, fullCollectorConfig, collectorPipelineExplanation } from '../../data/collectorConfig';
import { CodeBlock } from '../UI/CodeBlock';
import { InsightCard } from '../UI/InsightCard';
import { Download, Cpu, Upload, ArrowRight } from 'lucide-react';

type FocusedComponent = 'collector' | 'receivers' | 'processors' | 'exporters';

export function CollectorPanel({ focusedComponent = 'collector' }: { focusedComponent?: FocusedComponent }) {
  return (
    <div className="space-y-6">
      {/* Introduction */}
      <p className="text-[var(--text-secondary)] leading-relaxed">
        The <strong className="text-[var(--text-primary)]">OpenTelemetry Collector</strong> is a 
        vendor-agnostic proxy that receives, processes, and exports telemetry data. It decouples 
        your application from backend-specific concerns.
      </p>

      {/* Pipeline Visualization */}
      <div className="space-y-3">
        <h3 className="font-medium text-[var(--text-primary)]">Pipeline Architecture</h3>
        <div className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]">
          <div className="flex items-center justify-between">
            <PipelineStage
              icon={<Download className="w-5 h-5" />}
              title="Receivers"
              description="Data ingestion"
              color="#60a5fa"
              isActive={focusedComponent === 'receivers'}
            />
            <ArrowRight className="w-5 h-5 text-[var(--border-color)]" />
            <PipelineStage
              icon={<Cpu className="w-5 h-5" />}
              title="Processors"
              description="Transform"
              color="#34d399"
              isActive={focusedComponent === 'processors'}
            />
            <ArrowRight className="w-5 h-5 text-[var(--border-color)]" />
            <PipelineStage
              icon={<Upload className="w-5 h-5" />}
              title="Exporters"
              description="Data egress"
              color="#fbbf24"
              isActive={focusedComponent === 'exporters'}
            />
          </div>
        </div>
      </div>

      {/* Receivers Section */}
      {(focusedComponent === 'collector' || focusedComponent === 'receivers') && (
        <div className="space-y-3">
          <h3 className="font-medium text-[var(--text-primary)] flex items-center gap-2">
            <Download className="w-4 h-4 text-blue-400" />
            Receivers
          </h3>
          <p className="text-sm text-[var(--text-secondary)]">
            {collectorPipelineExplanation.receivers}
          </p>
          <div className="grid gap-2">
            {receivers.slice(0, focusedComponent === 'receivers' ? undefined : 3).map((receiver) => (
              <ComponentCard key={receiver.name} component={receiver} />
            ))}
          </div>
        </div>
      )}

      {/* Processors Section */}
      {(focusedComponent === 'collector' || focusedComponent === 'processors') && (
        <div className="space-y-3">
          <h3 className="font-medium text-[var(--text-primary)] flex items-center gap-2">
            <Cpu className="w-4 h-4 text-green-400" />
            Processors
          </h3>
          <p className="text-sm text-[var(--text-secondary)]">
            {collectorPipelineExplanation.processors}
          </p>
          <div className="grid gap-2">
            {processors.slice(0, focusedComponent === 'processors' ? undefined : 3).map((processor) => (
              <ComponentCard key={processor.name} component={processor} />
            ))}
          </div>
        </div>
      )}

      {/* Exporters Section */}
      {(focusedComponent === 'collector' || focusedComponent === 'exporters') && (
        <div className="space-y-3">
          <h3 className="font-medium text-[var(--text-primary)] flex items-center gap-2">
            <Upload className="w-4 h-4 text-amber-400" />
            Exporters
          </h3>
          <p className="text-sm text-[var(--text-secondary)]">
            {collectorPipelineExplanation.exporters}
          </p>
          <div className="grid gap-2">
            {exporters.map((exporter) => (
              <ComponentCard key={exporter.name} component={exporter} />
            ))}
          </div>
        </div>
      )}

      {/* Full Config Example */}
      {focusedComponent === 'collector' && (
        <div className="space-y-3">
          <h3 className="font-medium text-[var(--text-primary)]">Full Configuration</h3>
          <CodeBlock
            language="yaml"
            title="otel-collector-config.yaml"
            code={fullCollectorConfig}
          />
        </div>
      )}

      {/* Insight */}
      <InsightCard title="Why Use the Collector?" variant="info">
        <ul className="space-y-1 text-sm">
          <li>• Offload processing from your application</li>
          <li>• Centralized configuration for all telemetry</li>
          <li>• Buffer and retry on backend failures</li>
          <li>• Switch backends without code changes</li>
        </ul>
      </InsightCard>
    </div>
  );
}

function PipelineStage({
  icon,
  title,
  description,
  color,
  isActive,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  isActive: boolean;
}) {
  return (
    <motion.div
      animate={{ scale: isActive ? 1.05 : 1 }}
      className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
        isActive ? 'bg-[var(--bg-tertiary)]' : ''
      }`}
    >
      <div
        className="p-2 rounded-lg mb-2"
        style={{ backgroundColor: `${color}20`, color }}
      >
        {icon}
      </div>
      <span className="font-medium text-sm text-[var(--text-primary)]">{title}</span>
      <span className="text-xs text-[var(--text-secondary)]">{description}</span>
    </motion.div>
  );
}

function ComponentCard({ component }: { component: typeof receivers[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)]"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-sm font-medium text-[var(--text-primary)]">
          {component.name}
        </span>
        <span className="text-xs px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
          {component.type}
        </span>
      </div>
      <p className="text-xs text-[var(--text-secondary)] mb-2">
        {component.description}
      </p>
      <details className="group">
        <summary className="text-xs text-[var(--otel-blue)] cursor-pointer hover:underline">
          View config
        </summary>
        <pre className="mt-2 p-2 rounded bg-[var(--bg-secondary)] text-xs font-mono overflow-x-auto">
          {component.config}
        </pre>
      </details>
    </motion.div>
  );
}
