import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

// Path definitions based on CSS layout:
// Left column: left-8 (32px) + w-[200px] = right edge at 232px
// 
// Application Services Y centers (calculated from layout):
//   - Web Frontend: 114
//   - API Gateway: 202
//   - Order Service: 290
// 
// Infrastructure Y centers:
//   - Linux VMs: 434
//   - Kubernetes: 486
//   - System Logs: 538
//
// Collector: left-[480px], Receivers left edge ~496
// Elastic: left-[1020px]

const PATHS = {
  // Application Services -> Receivers (measured positions)
  webFrontend: "M 232 121 C 320 121, 420 150, 496 190",
  apiGateway: "M 232 223 C 320 223, 420 210, 496 195",
  orderService: "M 232 325 C 320 325, 420 260, 496 200",
  
  // Infrastructure -> Receivers (measured positions)
  linuxVMs: "M 232 469 C 320 469, 420 350, 496 210",
  kubernetes: "M 232 555 C 320 555, 420 400, 496 220",
  systemLogs: "M 232 641 C 320 641, 420 450, 496 230",
  
  // Exporters -> Elastic (curved paths to measured positions)
  // APM: x=1037, y=173 | Metrics: x=1037, y=230 | Logs: x=1037, y=287
  toAPM: "M 884 195 C 920 195, 980 173, 1037 173",
  toMetrics: "M 884 195 C 920 195, 980 210, 1037 230",
  toLogs: "M 884 195 C 920 195, 980 250, 1037 287",
};

export function MainDiagram() {
  const { isAnimating, activeSignal } = useAppContext();
  
  return (
    <div className="relative w-full h-full overflow-x-auto">
      <div className="min-w-[1400px] h-[700px] relative">
        {/* Background grid */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--text-secondary) 1px, transparent 1px),
              linear-gradient(to bottom, var(--text-secondary) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Connection lines and animated particles (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="appGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--otel-blue)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--otel-blue)" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="infraGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--metric-color)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--metric-color)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          
          {/* === APPLICATION SERVICES TO COLLECTOR (curved paths) === */}
          <path d={PATHS.webFrontend} stroke="url(#appGradient)" strokeWidth="2" fill="none" />
          <path d={PATHS.apiGateway} stroke="url(#appGradient)" strokeWidth="2" fill="none" />
          <path d={PATHS.orderService} stroke="url(#appGradient)" strokeWidth="2" fill="none" />
          
          {/* === INFRASTRUCTURE TO COLLECTOR (dashed curved paths) === */}
          <path d={PATHS.linuxVMs} stroke="url(#infraGradient)" strokeWidth="2" strokeDasharray="6 4" fill="none" />
          <path d={PATHS.kubernetes} stroke="url(#infraGradient)" strokeWidth="2" strokeDasharray="6 4" fill="none" />
          <path d={PATHS.systemLogs} stroke="url(#infraGradient)" strokeWidth="2" strokeDasharray="6 4" fill="none" />
          
          {/* === COLLECTOR TO ELASTIC === */}
          <path d={PATHS.toAPM} stroke="#60a5fa" strokeWidth="2" strokeOpacity="0.4" fill="none" />
          <path d={PATHS.toMetrics} stroke="#34d399" strokeWidth="2" strokeOpacity="0.4" fill="none" />
          <path d={PATHS.toLogs} stroke="#fbbf24" strokeWidth="2" strokeOpacity="0.4" fill="none" />
          
          {/* === ANIMATED PARTICLES (follow paths exactly) === */}
          {isAnimating && (
            <>
              {/* Web Frontend - traces, metrics, logs */}
              {(activeSignal === 'all' || activeSignal === 'traces') && (
                <SvgParticle path={PATHS.webFrontend} color="#60a5fa" duration={3} delay={0} />
              )}
              {(activeSignal === 'all' || activeSignal === 'metrics') && (
                <SvgParticle path={PATHS.webFrontend} color="#34d399" duration={4} delay={0.5} />
              )}
              {(activeSignal === 'all' || activeSignal === 'logs') && (
                <SvgParticle path={PATHS.webFrontend} color="#fbbf24" duration={5} delay={1.2} />
              )}
              
              {/* API Gateway - traces, metrics, logs */}
              {(activeSignal === 'all' || activeSignal === 'traces') && (
                <SvgParticle path={PATHS.apiGateway} color="#60a5fa" duration={3} delay={0.8} />
              )}
              {(activeSignal === 'all' || activeSignal === 'metrics') && (
                <SvgParticle path={PATHS.apiGateway} color="#34d399" duration={4} delay={1.8} />
              )}
              {(activeSignal === 'all' || activeSignal === 'logs') && (
                <SvgParticle path={PATHS.apiGateway} color="#fbbf24" duration={5} delay={0.3} />
              )}
              
              {/* Order Service - traces, metrics, logs */}
              {(activeSignal === 'all' || activeSignal === 'traces') && (
                <SvgParticle path={PATHS.orderService} color="#60a5fa" duration={3} delay={1.5} />
              )}
              {(activeSignal === 'all' || activeSignal === 'metrics') && (
                <SvgParticle path={PATHS.orderService} color="#34d399" duration={4} delay={0.2} />
              )}
              {(activeSignal === 'all' || activeSignal === 'logs') && (
                <SvgParticle path={PATHS.orderService} color="#fbbf24" duration={5} delay={2.5} />
              )}
              
              {/* Linux VMs - metrics, logs only */}
              {(activeSignal === 'all' || activeSignal === 'metrics') && (
                <SvgParticle path={PATHS.linuxVMs} color="#34d399" duration={4.5} delay={0} />
              )}
              {(activeSignal === 'all' || activeSignal === 'logs') && (
                <SvgParticle path={PATHS.linuxVMs} color="#fbbf24" duration={5.5} delay={1.5} />
              )}
              
              {/* Kubernetes - metrics, logs only */}
              {(activeSignal === 'all' || activeSignal === 'metrics') && (
                <SvgParticle path={PATHS.kubernetes} color="#34d399" duration={4.5} delay={1.2} />
              )}
              {(activeSignal === 'all' || activeSignal === 'logs') && (
                <SvgParticle path={PATHS.kubernetes} color="#fbbf24" duration={5.5} delay={0.7} />
              )}
              
              {/* System Logs - logs only */}
              {(activeSignal === 'all' || activeSignal === 'logs') && (
                <SvgParticle path={PATHS.systemLogs} color="#fbbf24" duration={5.5} delay={0} />
              )}
              
              {/* Exporters to Elastic */}
              {(activeSignal === 'all' || activeSignal === 'traces') && (
                <>
                  <SvgParticle path={PATHS.toAPM} color="#60a5fa" duration={2} delay={0} />
                  <SvgParticle path={PATHS.toAPM} color="#60a5fa" duration={2} delay={0.7} />
                  <SvgParticle path={PATHS.toAPM} color="#60a5fa" duration={2} delay={1.4} />
                </>
              )}
              {(activeSignal === 'all' || activeSignal === 'metrics') && (
                <>
                  <SvgParticle path={PATHS.toMetrics} color="#34d399" duration={2} delay={0.2} />
                  <SvgParticle path={PATHS.toMetrics} color="#34d399" duration={2} delay={0.9} />
                  <SvgParticle path={PATHS.toMetrics} color="#34d399" duration={2} delay={1.6} />
                </>
              )}
              {(activeSignal === 'all' || activeSignal === 'logs') && (
                <>
                  <SvgParticle path={PATHS.toLogs} color="#fbbf24" duration={2} delay={0.4} />
                  <SvgParticle path={PATHS.toLogs} color="#fbbf24" duration={2} delay={1.1} />
                  <SvgParticle path={PATHS.toLogs} color="#fbbf24" duration={2} delay={1.8} />
                </>
              )}
            </>
          )}
        </svg>

        {/* Layer Labels */}
        <div className="absolute left-4 top-4 text-xs font-semibold tracking-wider text-[var(--text-secondary)] opacity-50">
          SOURCES
        </div>
        <div className="absolute left-[500px] top-4 text-xs font-semibold tracking-wider text-[var(--text-secondary)] opacity-50">
          COLLECTOR
        </div>
        <div className="absolute left-[1040px] top-4 text-xs font-semibold tracking-wider text-[var(--text-secondary)] opacity-50">
          BACKEND
        </div>

        {/* Left Column: Services & Infrastructure */}
        <div className="absolute left-8 top-12 w-[200px]">
          {/* Services Section */}
          <div className="mb-6">
            <div className="text-xs font-medium text-[var(--text-secondary)] mb-3 px-2">
              Application Services
            </div>
            <div className="space-y-3">
              <ServiceNodeCompact name="Web Frontend" technology="React" />
              <ServiceNodeCompact name="API Gateway" technology="Node.js" />
              <ServiceNodeCompact name="Order Service" technology="Python" />
            </div>
          </div>
          
          {/* Infrastructure Section */}
          <div className="mt-8">
            <div className="text-xs font-medium text-[var(--text-secondary)] mb-3 px-2">
              Infrastructure
            </div>
            <div className="space-y-2">
              <InfraNodeCompact name="Linux VMs" metrics="CPU, Memory, Disk" />
              <InfraNodeCompact name="Kubernetes" metrics="Pods, Nodes, Events" />
              <InfraNodeCompact name="System Logs" metrics="syslog, journald" />
            </div>
          </div>
        </div>

        {/* Center: Collector */}
        <div className="absolute left-[480px] top-[80px]">
          <CollectorNodeHorizontal />
        </div>

        {/* Right: Elastic */}
        <div className="absolute left-[1020px] top-[80px]">
          <ElasticNodeVertical />
        </div>
      </div>
    </div>
  );
}

// Compact service node - INTERACTIVE
function ServiceNodeCompact({ name, technology }: { name: string; technology: string }) {
  const { setExpandedPanel } = useAppContext();
  
  return (
    <motion.div
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setExpandedPanel('sdk')}
      className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--otel-blue)] transition-colors cursor-pointer"
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="font-medium text-sm text-[var(--text-primary)]">{name}</div>
          <div className="text-xs text-[var(--text-secondary)]">{technology}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs px-2 py-0.5 rounded bg-[var(--otel-blue)]/10 text-[var(--otel-blue)] font-medium">
          OTel SDK
        </span>
        <div className="flex gap-1 ml-auto">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--trace-color)' }} />
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--metric-color)' }} />
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--log-color)' }} />
        </div>
      </div>
    </motion.div>
  );
}

// Compact infra node - INTERACTIVE
function InfraNodeCompact({ name, metrics }: { name: string; metrics: string }) {
  const { setExpandedPanel } = useAppContext();
  
  return (
    <motion.div
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setExpandedPanel('resource')}
      className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--metric-color)] transition-colors cursor-pointer"
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="font-medium text-sm text-[var(--text-primary)]">{name}</div>
          <div className="text-xs text-[var(--text-secondary)]">{metrics}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex gap-1 ml-auto">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--metric-color)' }} />
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--log-color)' }} />
        </div>
      </div>
    </motion.div>
  );
}

// Horizontal Collector layout - INTERACTIVE
function CollectorNodeHorizontal() {
  const { setExpandedPanel } = useAppContext();
  
  return (
    <motion.div 
      className="w-[480px] p-4 rounded-xl bg-[var(--bg-secondary)] border-2 border-[var(--otel-blue)]/50 shadow-xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {/* Header */}
      <motion.div 
        className="flex items-center gap-2 mb-4 cursor-pointer hover:opacity-80"
        whileHover={{ scale: 1.02 }}
        onClick={() => setExpandedPanel('collector')}
      >
        <OTelLogo />
        <h3 className="font-bold text-[var(--text-primary)]">OpenTelemetry Collector</h3>
      </motion.div>

      {/* Pipeline - Horizontal */}
      <div className="flex items-stretch gap-3">
        {/* Receivers */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setExpandedPanel('receivers')}
          className="flex-1 p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] hover:border-[#F5A800] transition-colors cursor-pointer"
        >
          <div className="text-xs font-medium text-[#F5A800] mb-2 flex items-center gap-1">
            <span>↓</span> Receivers
          </div>
          <div className="space-y-1 text-[10px] font-mono">
            <div className="px-1.5 py-0.5 rounded bg-[#F5A800]/10 text-[#F5A800]">otlp</div>
            <div className="px-1.5 py-0.5 rounded bg-[#F5A800]/10 text-[#F5A800]">hostmetrics</div>
            <div className="px-1.5 py-0.5 rounded bg-[#F5A800]/10 text-[#F5A800]">filelog</div>
            <div className="px-1.5 py-0.5 rounded bg-[#F5A800]/10 text-[#F5A800]">k8s_cluster</div>
          </div>
        </motion.div>

        {/* Arrow */}
        <div className="flex items-center text-[var(--border-color)]">→</div>

        {/* Processors */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setExpandedPanel('processors')}
          className="flex-1 p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] hover:border-[#425CC7] transition-colors cursor-pointer"
        >
          <div className="text-xs font-medium text-[#425CC7] mb-2 flex items-center gap-1">
            <span>⚙</span> Processors
          </div>
          <div className="space-y-1 text-[10px] font-mono">
            <div className="px-1.5 py-0.5 rounded bg-[#425CC7]/10 text-[#425CC7]">batch</div>
            <div className="px-1.5 py-0.5 rounded bg-[#425CC7]/10 text-[#425CC7]">memory_limiter</div>
            <div className="px-1.5 py-0.5 rounded bg-[#425CC7]/10 text-[#425CC7]">resourcedetection</div>
            <div className="px-1.5 py-0.5 rounded bg-[#425CC7]/10 text-[#425CC7]">attributes</div>
          </div>
        </motion.div>

        {/* Arrow */}
        <div className="flex items-center text-[var(--border-color)]">→</div>

        {/* Exporters */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setExpandedPanel('exporters')}
          className="flex-1 p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] hover:border-[#F5A800] transition-colors cursor-pointer"
        >
          <div className="text-xs font-medium text-[#F5A800] mb-2 flex items-center gap-1">
            <span>↑</span> Exporters
          </div>
          <div className="space-y-1 text-[10px] font-mono">
            <div className="px-1.5 py-0.5 rounded bg-[#F5A800]/10 text-[#F5A800]">otlp/elastic</div>
          </div>
        </motion.div>
      </div>

      {/* Pipeline indicators */}
      <div className="mt-3 pt-3 border-t border-[var(--border-color)] flex justify-center gap-4 text-[10px] text-[var(--text-secondary)]">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[var(--trace-color)]" />
          traces
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[var(--metric-color)]" />
          metrics
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[var(--log-color)]" />
          logs
        </span>
      </div>
    </motion.div>
  );
}

// Vertical Elastic layout - INTERACTIVE
function ElasticNodeVertical() {
  const { setActiveSignal } = useAppContext();
  
  return (
    <motion.div 
      className="w-[180px] p-4 rounded-xl bg-gradient-to-b from-[#00bfb3]/10 to-[#f04e98]/10 border border-[#00bfb3]/30 shadow-xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="font-bold text-sm text-[var(--text-primary)]">Elastic</h3>
        <p className="text-[10px] text-[var(--text-secondary)]">Observability</p>
      </div>

      {/* Data stores - Vertical - INTERACTIVE */}
      <div className="space-y-2">
        <DataStoreCompact 
          name="APM" 
          subtitle="Traces" 
          color="var(--trace-color)" 
          onClick={() => setActiveSignal('traces')}
        />
        <DataStoreCompact 
          name="Metrics" 
          subtitle="Time Series" 
          color="var(--metric-color)" 
          onClick={() => setActiveSignal('metrics')}
        />
        <DataStoreCompact 
          name="Logs" 
          subtitle="Records" 
          color="var(--log-color)" 
          onClick={() => setActiveSignal('logs')}
        />
      </div>

      <div className="mt-3 pt-2 border-t border-[var(--border-color)]/30 text-center">
        <span className="text-[10px] text-[var(--text-secondary)]">via OTLP</span>
      </div>
    </motion.div>
  );
}

function DataStoreCompact({ 
  name, 
  subtitle, 
  color, 
  onClick 
}: { 
  name: string; 
  subtitle: string; 
  color: string; 
  onClick: () => void;
}) {
  return (
    <motion.div 
      whileHover={{ scale: 1.03, x: 2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[#00bfb3] transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
        <div>
          <div className="text-xs font-medium text-[var(--text-primary)]">{name}</div>
          <div className="text-[10px] text-[var(--text-secondary)]">{subtitle}</div>
        </div>
      </div>
    </motion.div>
  );
}

function OTelLogo() {
  return (
    <img 
      src="https://opentelemetry.io/img/logos/opentelemetry-logo-nav.png" 
      alt="OpenTelemetry" 
      className="w-6 h-6"
    />
  );
}

// SVG Particle that follows a path exactly using animateMotion
function SvgParticle({ 
  path, 
  color, 
  duration, 
  delay 
}: { 
  path: string; 
  color: string; 
  duration: number; 
  delay: number;
}) {
  const filterId = `glow-${color.replace('#', '')}-${delay}`;
  return (
    <g>
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle r="6" fill={color} filter={`url(#${filterId})`}>
        <animateMotion
          dur={`${duration}s`}
          repeatCount="indefinite"
          begin={`${delay}s`}
          path={path}
        />
      </circle>
    </g>
  );
}
