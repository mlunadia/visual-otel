import { motion } from 'framer-motion';
import { exampleLogs, logCorrelationExample, severityLevels } from '../../data/exampleLogs';
import { InsightCard } from '../UI/InsightCard';
import { CodeBlock } from '../UI/CodeBlock';
import { Link, AlertTriangle, Info, AlertCircle } from 'lucide-react';

export function LogsPanel() {
  return (
    <div className="space-y-6">
      {/* Introduction */}
      <p className="text-[var(--text-secondary)] leading-relaxed">
        <strong className="text-[var(--text-primary)]">OTel Logs</strong> are structured log records 
        with standardized fields. The key feature: automatic correlation with traces via trace_id.
      </p>

      {/* Log Examples */}
      <div className="space-y-3">
        <h3 className="font-medium text-[var(--text-primary)]">Correlated Logs</h3>
        <div className="space-y-2">
          {exampleLogs.slice(0, 3).map((log, index) => (
            <LogRow key={index} log={log} index={index} />
          ))}
        </div>
      </div>

      {/* Correlation Insight */}
      <InsightCard title="Log-Trace Correlation" variant="tip">
        <div className="flex items-start gap-2">
          <Link className="w-4 h-4 mt-0.5 text-amber-400 flex-shrink-0" />
          <div>
            <p className="mb-2">{logCorrelationExample.description}</p>
            <ul className="text-xs space-y-1">
              <li>
                <span className="text-cyan-400">trace_id</span> → {logCorrelationExample.fields.trace_id}
              </li>
              <li>
                <span className="text-cyan-400">span_id</span> → {logCorrelationExample.fields.span_id}
              </li>
            </ul>
          </div>
        </div>
      </InsightCard>

      {/* Log Structure */}
      <div className="space-y-3">
        <h3 className="font-medium text-[var(--text-primary)]">Log Record Structure</h3>
        <CodeBlock
          language="json"
          title="OTel Log Record"
          code={JSON.stringify({
            timestamp: exampleLogs[0].timestamp,
            severityText: exampleLogs[0].severityText,
            severityNumber: exampleLogs[0].severityNumber,
            body: exampleLogs[0].body,
            traceId: exampleLogs[0].traceId,
            spanId: exampleLogs[0].spanId,
            attributes: exampleLogs[0].attributes,
            resource: exampleLogs[0].resource,
          }, null, 2)}
        />
      </div>

      {/* Severity Levels */}
      <div className="space-y-3">
        <h3 className="font-medium text-[var(--text-primary)]">Severity Levels</h3>
        <div className="grid grid-cols-2 gap-2">
          {severityLevels.map((level) => (
            <div
              key={level.number}
              className="flex items-center gap-2 p-2 rounded bg-[var(--bg-secondary)] text-sm"
            >
              <SeverityIcon severity={level.text} />
              <span className="font-medium text-[var(--text-primary)]">{level.text}</span>
              <span className="text-xs text-[var(--text-secondary)]">({level.number})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Context */}
      <div className="space-y-3">
        <h3 className="font-medium text-[var(--text-primary)]">Resource Context</h3>
        <p className="text-sm text-[var(--text-secondary)]">
          Every log includes resource attributes identifying where it came from:
        </p>
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3 font-mono text-xs space-y-1">
          {Object.entries(exampleLogs[0].resource).map(([key, value]) => (
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

function LogRow({ log, index }: { log: typeof exampleLogs[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]"
    >
      <div className="flex items-start gap-3">
        <SeverityIcon severity={log.severityText} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2 py-0.5 rounded bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">
              {log.resource['service.name']}
            </span>
            <span className="text-xs text-[var(--text-secondary)]">
              {new Date(log.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <p className="text-sm text-[var(--text-primary)]">{log.body}</p>
          {log.traceId && (
            <div className="mt-2 flex items-center gap-2 text-xs">
              <Link className="w-3 h-3 text-[var(--log-color)]" />
              <span className="text-[var(--text-secondary)]">trace:</span>
              <span className="font-mono text-[var(--trace-color)]">{log.traceId.slice(0, 12)}...</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function SeverityIcon({ severity }: { severity: string }) {
  switch (severity) {
    case 'ERROR':
    case 'FATAL':
      return <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />;
    case 'WARN':
      return <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />;
    default:
      return <Info className="w-4 h-4 text-blue-400 flex-shrink-0" />;
  }
}
