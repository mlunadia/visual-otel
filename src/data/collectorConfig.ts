export interface CollectorComponent {
  name: string;
  type: 'receiver' | 'processor' | 'exporter';
  description: string;
  config: string;
}

export const receivers: CollectorComponent[] = [
  {
    name: 'otlp',
    type: 'receiver',
    description: 'Receives telemetry via OpenTelemetry Protocol (gRPC and HTTP)',
    config: `otlp:
  protocols:
    grpc:
      endpoint: 0.0.0.0:4317
    http:
      endpoint: 0.0.0.0:4318`,
  },
  {
    name: 'hostmetrics',
    type: 'receiver',
    description: 'Collects host-level metrics (CPU, memory, disk, network)',
    config: `hostmetrics:
  collection_interval: 30s
  scrapers:
    cpu:
    memory:
    disk:
    network:
    filesystem:`,
  },
  {
    name: 'filelog',
    type: 'receiver',
    description: 'Reads and parses log files from the filesystem',
    config: `filelog:
  include:
    - /var/log/app/*.log
  start_at: end
  operators:
    - type: json_parser
      timestamp:
        parse_from: attributes.time
        layout: '%Y-%m-%dT%H:%M:%S'`,
  },
  {
    name: 'k8s_cluster',
    type: 'receiver',
    description: 'Collects Kubernetes cluster-level metrics and events',
    config: `k8s_cluster:
  auth_type: serviceAccount
  collection_interval: 30s
  node_conditions_to_report:
    - Ready
    - MemoryPressure`,
  },
  {
    name: 'kubeletstats',
    type: 'receiver',
    description: 'Collects pod/container metrics from Kubelet',
    config: `kubeletstats:
  auth_type: serviceAccount
  collection_interval: 20s
  endpoint: "https://\${K8S_NODE_NAME}:10250"`,
  },
];

export const processors: CollectorComponent[] = [
  {
    name: 'batch',
    type: 'processor',
    description: 'Batches telemetry to reduce network overhead',
    config: `batch:
  timeout: 10s
  send_batch_size: 1000
  send_batch_max_size: 1500`,
  },
  {
    name: 'memory_limiter',
    type: 'processor',
    description: 'Prevents out-of-memory by limiting memory usage',
    config: `memory_limiter:
  check_interval: 1s
  limit_mib: 1500
  spike_limit_mib: 500`,
  },
  {
    name: 'resourcedetection',
    type: 'processor',
    description: 'Automatically detects and adds resource attributes',
    config: `resourcedetection:
  detectors:
    - env
    - system
    - gcp
    - aws
    - azure
    - k8s
  timeout: 5s`,
  },
  {
    name: 'attributes',
    type: 'processor',
    description: 'Modifies, adds, or removes attributes',
    config: `attributes:
  actions:
    - key: environment
      value: production
      action: upsert
    - key: team
      from_attribute: service.namespace
      action: insert`,
  },
  {
    name: 'filter',
    type: 'processor',
    description: 'Filters telemetry based on conditions',
    config: `filter:
  error_mode: ignore
  traces:
    span:
      - 'attributes["http.target"] == "/health"'
  metrics:
    metric:
      - 'name == "unwanted.metric"'`,
  },
  {
    name: 'transform',
    type: 'processor',
    description: 'Transforms telemetry using OTTL expressions',
    config: `transform:
  trace_statements:
    - context: span
      statements:
        - set(status.code, 1) where name == "health"
        - set(attributes["processed"], "true")`,
  },
];

export const exporters: CollectorComponent[] = [
  {
    name: 'otlp/elastic',
    type: 'exporter',
    description: 'Exports to Elastic Observability via OTLP',
    config: `otlp/elastic:
  endpoint: "your-deployment.es.io:443"
  headers:
    Authorization: "ApiKey your-api-key"
  compression: gzip`,
  },
  {
    name: 'debug',
    type: 'exporter',
    description: 'Outputs telemetry to console for debugging',
    config: `debug:
  verbosity: detailed
  sampling_initial: 5
  sampling_thereafter: 200`,
  },
];

export const fullCollectorConfig = `receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  
  hostmetrics:
    collection_interval: 30s
    scrapers:
      cpu:
      memory:
      disk:
      network:
  
  filelog:
    include:
      - /var/log/app/*.log

processors:
  memory_limiter:
    check_interval: 1s
    limit_mib: 1500
  
  resourcedetection:
    detectors: [env, system, gcp, aws, k8s]
  
  batch:
    timeout: 10s
    send_batch_size: 1000

exporters:
  otlp/elastic:
    endpoint: "your-deployment.es.io:443"
    headers:
      Authorization: "ApiKey \${ELASTIC_API_KEY}"

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [memory_limiter, resourcedetection, batch]
      exporters: [otlp/elastic]
    
    metrics:
      receivers: [otlp, hostmetrics]
      processors: [memory_limiter, resourcedetection, batch]
      exporters: [otlp/elastic]
    
    logs:
      receivers: [otlp, filelog]
      processors: [memory_limiter, resourcedetection, batch]
      exporters: [otlp/elastic]`;

export const collectorPipelineExplanation = {
  receivers: 'Data ingestion - how telemetry enters the collector',
  processors: 'Data transformation - enrich, filter, batch, transform',
  exporters: 'Data egress - send telemetry to backends',
  pipelines: 'Connect receivers → processors → exporters per signal type',
};
