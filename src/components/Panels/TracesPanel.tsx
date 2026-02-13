import { motion } from 'framer-motion';
import { exampleTrace, traceContextPropagation } from '../../data/exampleTraces';
import { InsightCard } from '../UI/InsightCard';
import { CodeBlock } from '../UI/CodeBlock';
import { ArrowRight, Clock, CheckCircle } from 'lucide-react';

export function TracesPanel() {
  return (
    <div className="space-y-6">
      {/* Introduction */}
      <p className="text-[var(--text-secondary)] leading-relaxed">
        A <strong className="text-[var(--text-primary)]">distributed trace</strong> tracks a request 
        as it flows through multiple services. Each operation is recorded as a <strong className="text-[var(--text-primary)]">span</strong>.
      </p>

      {/* Trace Visualization */}
      <div className="space-y-3">
        <h3 className="font-medium text-[var(--text-primary)]">Example Trace</h3>
        <div className="bg-[var(--bg-secondary)] rounded-lg p-4 border border-[var(--border-color)]">
          <div className="flex items-center gap-2 mb-4 text-xs text-[var(--text-secondary)]">
            <span className="font-mono">Trace ID:</span>
            <span className="font-mono text-[var(--trace-color)]">{exampleTrace[0].traceId}</span>
          </div>
          
          <div className="space-y-2">
            {exampleTrace.map((span, index) => (
              <SpanRow key={span.spanId} span={span} depth={getSpanDepth(span, exampleTrace)} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Span Detail */}
      <div className="space-y-3">
        <h3 className="font-medium text-[var(--text-primary)]">Span Attributes</h3>
        <CodeBlock
          language="json"
          title="Span Example"
          code={JSON.stringify({
            name: exampleTrace[3].name,
            kind: exampleTrace[3].kind,
            attributes: exampleTrace[3].attributes,
            startTime: "2024-01-15T10:23:45.080Z",
            duration: `${exampleTrace[3].duration}ms`,
          }, null, 2)}
        />
      </div>

      {/* Context Propagation */}
      <InsightCard title="Context Propagation" variant="info">
        <p className="mb-3">
          Trace context is automatically propagated between services via HTTP headers:
        </p>
        <div className="font-mono text-xs bg-[var(--bg-tertiary)] rounded p-2 space-y-1">
          <div>
            <span className="text-cyan-400">traceparent:</span>{' '}
            <span className="text-amber-300">{traceContextPropagation.headers.traceparent}</span>
          </div>
          <div>
            <span className="text-cyan-400">tracestate:</span>{' '}
            <span className="text-amber-300">{traceContextPropagation.headers.tracestate}</span>
          </div>
        </div>
      </InsightCard>

      {/* Key Concepts */}
      <div className="space-y-3">
        <h3 className="font-medium text-[var(--text-primary)]">Key Concepts</h3>
        <div className="grid gap-2">
          <ConceptRow
            term="Trace"
            description="Collection of spans sharing the same trace ID"
          />
          <ConceptRow
            term="Span"
            description="Single operation with name, timing, and attributes"
          />
          <ConceptRow
            term="Span Kind"
            description="Role: server, client, internal, producer, consumer"
          />
          <ConceptRow
            term="Parent Span"
            description="Span that triggered this operation (creates hierarchy)"
          />
        </div>
      </div>
    </div>
  );
}

function SpanRow({ span, depth, index }: { span: typeof exampleTrace[0]; depth: number; index: number }) {
  const barWidth = (span.duration / 450) * 100;
  const barOffset = (span.startTime / 450) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className="flex items-center gap-2">
        {/* Indentation */}
        <div style={{ width: depth * 16 }} className="flex-shrink-0">
          {depth > 0 && (
            <div className="flex items-center justify-end">
              <div className="w-2 h-px bg-[var(--border-color)]" />
              <ArrowRight className="w-3 h-3 text-[var(--border-color)]" />
            </div>
          )}
        </div>
        
        {/* Service badge */}
        <span className="text-xs px-2 py-0.5 rounded bg-[var(--bg-tertiary)] text-[var(--text-secondary)] font-medium min-w-[100px]">
          {span.serviceName}
        </span>
        
        {/* Span name */}
        <span className="text-sm text-[var(--text-primary)] truncate flex-1">
          {span.name}
        </span>
        
        {/* Duration */}
        <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
          <Clock className="w-3 h-3" />
          <span>{span.duration}ms</span>
        </div>
        
        {/* Status */}
        <CheckCircle className="w-4 h-4 text-green-400" />
      </div>
      
      {/* Timeline bar */}
      <div className="mt-1 ml-[calc(16px*var(--depth))] h-2 bg-[var(--bg-tertiary)] rounded-full relative overflow-hidden"
           style={{ '--depth': depth } as React.CSSProperties}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${barWidth}%` }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
          className="absolute h-full rounded-full"
          style={{
            left: `${barOffset}%`,
            backgroundColor: 'var(--trace-color)',
            opacity: 0.8,
          }}
        />
      </div>
    </motion.div>
  );
}

function ConceptRow({ term, description }: { term: string; description: string }) {
  return (
    <div className="flex gap-3 text-sm">
      <span className="font-medium text-[var(--trace-color)] min-w-[80px]">{term}</span>
      <span className="text-[var(--text-secondary)]">{description}</span>
    </div>
  );
}

function getSpanDepth(span: typeof exampleTrace[0], allSpans: typeof exampleTrace): number {
  if (!span.parentSpanId) return 0;
  const parent = allSpans.find(s => s.spanId === span.parentSpanId);
  if (!parent) return 0;
  return 1 + getSpanDepth(parent, allSpans);
}
