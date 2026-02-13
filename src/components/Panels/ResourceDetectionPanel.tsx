import { motion } from 'framer-motion';
import { resourceDetectionSources } from '../../data/semConvExamples';
import { InsightCard } from '../UI/InsightCard';
import { Cpu, Cloud, Container, Server, Globe } from 'lucide-react';

export function ResourceDetectionPanel() {
  return (
    <div className="space-y-6">
      {/* Introduction */}
      <p className="text-[var(--text-secondary)] leading-relaxed">
        <strong className="text-[var(--text-primary)]">Resource Detection</strong> automatically 
        discovers context about where your telemetry originates. This metadata is attached to 
        every span, metric, and log.
      </p>

      {/* Visual Example */}
      <div className="space-y-3">
        <h3 className="font-medium text-[var(--text-primary)]">Auto-Detected Context</h3>
        <div className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Cpu className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <span className="font-medium text-[var(--text-primary)]">Your Application</span>
              <p className="text-xs text-[var(--text-secondary)]">OTel SDK automatically detects:</p>
            </div>
          </div>
          
          <div className="space-y-2 font-mono text-xs">
            <ResourceAttribute
              key="service.name"
              value="order-service"
              source="env var / config"
              icon={<Server className="w-3 h-3" />}
            />
            <ResourceAttribute
              key="service.version"
              value="2.1.0"
              source="package.json"
              icon={<Server className="w-3 h-3" />}
            />
            <ResourceAttribute
              key="host.name"
              value="prod-vm-03"
              source="hostname"
              icon={<Server className="w-3 h-3" />}
            />
            <ResourceAttribute
              key="cloud.provider"
              value="aws"
              source="cloud metadata API"
              icon={<Cloud className="w-3 h-3" />}
            />
            <ResourceAttribute
              key="cloud.region"
              value="us-west-2"
              source="cloud metadata API"
              icon={<Cloud className="w-3 h-3" />}
            />
            <ResourceAttribute
              key="k8s.pod.name"
              value="order-svc-7f8d9"
              source="K8s downward API"
              icon={<Container className="w-3 h-3" />}
            />
            <ResourceAttribute
              key="k8s.namespace.name"
              value="production"
              source="K8s downward API"
              icon={<Container className="w-3 h-3" />}
            />
          </div>
        </div>
      </div>

      {/* Detection Sources */}
      <div className="space-y-3">
        <h3 className="font-medium text-[var(--text-primary)]">Detection Sources</h3>
        <div className="space-y-2">
          {resourceDetectionSources.map((source, index) => (
            <motion.div
              key={source.detector}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm font-medium text-[var(--otel-blue)]">
                  {source.detector}
                </span>
                <DetectorIcon detector={source.detector} />
              </div>
              <p className="text-xs text-[var(--text-secondary)] mb-2">{source.description}</p>
              <div className="flex flex-wrap gap-1">
                {source.attributes.map((attr) => (
                  <span
                    key={attr}
                    className="px-1.5 py-0.5 text-xs rounded bg-[var(--bg-tertiary)] text-cyan-400 font-mono"
                  >
                    {attr}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Collector Config */}
      <div className="space-y-3">
        <h3 className="font-medium text-[var(--text-primary)]">Collector Configuration</h3>
        <div className="bg-[var(--bg-secondary)] rounded-lg p-4 font-mono text-xs border border-[var(--border-color)]">
          <div className="text-[var(--text-secondary)]">processors:</div>
          <div className="pl-2 text-cyan-400">resourcedetection:</div>
          <div className="pl-4 text-cyan-400">detectors:</div>
          <div className="pl-6 text-pink-400">- env</div>
          <div className="pl-6 text-pink-400">- system</div>
          <div className="pl-6 text-pink-400">- gcp</div>
          <div className="pl-6 text-pink-400">- aws</div>
          <div className="pl-6 text-pink-400">- azure</div>
          <div className="pl-6 text-pink-400">- k8s</div>
          <div className="pl-4 text-cyan-400">timeout: <span className="text-amber-300">5s</span></div>
        </div>
      </div>

      {/* Insight */}
      <InsightCard title="Zero Configuration Benefit" variant="tip">
        <p>
          Resource detection happens automatically. Your telemetry is enriched with environment 
          context without any code changes. Filter by <code className="text-cyan-400">cloud.region</code> or 
          group by <code className="text-cyan-400">k8s.namespace.name</code> immediately.
        </p>
      </InsightCard>

      {/* How It's Used */}
      <div className="space-y-3">
        <h3 className="font-medium text-[var(--text-primary)]">Practical Uses</h3>
        <div className="grid gap-2 text-sm">
          <div className="flex items-start gap-2">
            <Globe className="w-4 h-4 text-[var(--otel-blue)] mt-0.5" />
            <span className="text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">Filter by region:</strong> See only 
              traces from <code className="text-cyan-400">us-west-2</code>
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Container className="w-4 h-4 text-[var(--otel-blue)] mt-0.5" />
            <span className="text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">Group by pod:</strong> Compare 
              performance across <code className="text-cyan-400">k8s.pod.name</code>
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Server className="w-4 h-4 text-[var(--otel-blue)] mt-0.5" />
            <span className="text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">Correlate with infra:</strong> Join 
              application metrics with host metrics via <code className="text-cyan-400">host.name</code>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourceAttribute({
  key: attrKey,
  value,
  source,
  icon,
}: {
  key: string;
  value: string;
  source: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between p-2 rounded bg-[var(--bg-tertiary)]">
      <div className="flex items-center gap-2">
        <span className="text-[var(--text-secondary)]">{icon}</span>
        <span className="text-cyan-400">{attrKey}</span>
        <span className="text-gray-400">:</span>
        <span className="text-amber-300">"{value}"</span>
      </div>
      <span className="text-xs text-[var(--text-secondary)]">← {source}</span>
    </div>
  );
}

function DetectorIcon({ detector }: { detector: string }) {
  switch (detector) {
    case 'gcp':
    case 'aws':
    case 'azure':
      return <Cloud className="w-4 h-4 text-[var(--text-secondary)]" />;
    case 'k8s':
      return <Container className="w-4 h-4 text-[var(--text-secondary)]" />;
    default:
      return <Server className="w-4 h-4 text-[var(--text-secondary)]" />;
  }
}
