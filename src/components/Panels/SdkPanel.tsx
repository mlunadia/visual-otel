import { motion } from 'framer-motion';
import { CodeBlock } from '../UI/CodeBlock';
import { InsightCard } from '../UI/InsightCard';
import { Zap, Code2, Settings } from 'lucide-react';

export function SdkPanel() {
  return (
    <div className="space-y-6">
      {/* Introduction */}
      <p className="text-[var(--text-secondary)] leading-relaxed">
        The <strong className="text-[var(--text-primary)]">OpenTelemetry SDK</strong> is a library 
        you add to your application to generate telemetry data. It provides APIs for creating 
        traces, metrics, and logs.
      </p>

      {/* Auto vs Manual */}
      <div className="space-y-4">
        <h3 className="font-medium text-[var(--text-primary)]">Instrumentation Types</h3>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-medium text-[var(--text-primary)]">Auto-Instrumentation</h4>
              <p className="text-xs text-[var(--text-secondary)]">Zero code changes required</p>
            </div>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mb-3">
            Automatically captures telemetry from popular frameworks and libraries:
          </p>
          <div className="flex flex-wrap gap-2">
            {['HTTP', 'gRPC', 'SQL', 'Redis', 'Kafka', 'Express', 'Flask', 'Spring'].map((lib) => (
              <span
                key={lib}
                className="px-2 py-1 text-xs rounded bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
              >
                {lib}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-medium text-[var(--text-primary)]">Manual Instrumentation</h4>
              <p className="text-xs text-[var(--text-secondary)]">Custom spans and metrics</p>
            </div>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            Add custom telemetry for business-specific operations not covered by auto-instrumentation.
          </p>
        </motion.div>
      </div>

      {/* Code Example */}
      <div className="space-y-3">
        <h3 className="font-medium text-[var(--text-primary)]">Example: Python</h3>
        <CodeBlock
          language="python"
          title="Auto-instrumentation setup"
          code={`# Install
pip install opentelemetry-distro opentelemetry-exporter-otlp

# Auto-instrument
opentelemetry-bootstrap -a install

# Run your app with instrumentation
opentelemetry-instrument \\
  --service_name=order-service \\
  --exporter_otlp_endpoint=http://collector:4317 \\
  python app.py`}
        />
      </div>

      <div className="space-y-3">
        <h3 className="font-medium text-[var(--text-primary)]">Manual Span Creation</h3>
        <CodeBlock
          language="python"
          title="Custom span example"
          code={`from opentelemetry import trace

tracer = trace.get_tracer("order-service")

def process_order(order_id):
    with tracer.start_as_current_span("process_order") as span:
        span.set_attribute("order.id", order_id)
        span.set_attribute("order.priority", "high")
        
        # Your business logic here
        validate_order(order_id)
        charge_payment(order_id)
        
        span.add_event("order_completed")`}
        />
      </div>

      {/* SDK Components */}
      <div className="space-y-3">
        <h3 className="font-medium text-[var(--text-primary)]">SDK Components</h3>
        <div className="grid gap-2">
          <ComponentRow
            icon={<Settings className="w-4 h-4" />}
            name="TracerProvider"
            description="Creates and manages Tracer instances for creating spans"
          />
          <ComponentRow
            icon={<Settings className="w-4 h-4" />}
            name="MeterProvider"
            description="Creates and manages Meter instances for recording metrics"
          />
          <ComponentRow
            icon={<Settings className="w-4 h-4" />}
            name="LoggerProvider"
            description="Creates and manages Logger instances for emitting logs"
          />
        </div>
      </div>

      {/* Insight */}
      <InsightCard title="Best Practice" variant="tip">
        <p>
          Start with auto-instrumentation to get immediate visibility. 
          Add manual instrumentation later for business-specific context like order IDs, 
          customer segments, or feature flags.
        </p>
      </InsightCard>
    </div>
  );
}

function ComponentRow({ icon, name, description }: { icon: React.ReactNode; name: string; description: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-secondary)]">
      <div className="p-1.5 rounded bg-[var(--bg-tertiary)] text-[var(--otel-blue)]">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-[var(--text-primary)] font-mono text-sm">{name}</h4>
        <p className="text-xs text-[var(--text-secondary)]">{description}</p>
      </div>
    </div>
  );
}
