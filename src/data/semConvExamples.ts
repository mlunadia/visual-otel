export interface SemConvCategory {
  name: string;
  description: string;
  attributes: { key: string; example: string; description: string }[];
}

export const semanticConventions: SemConvCategory[] = [
  {
    name: 'HTTP',
    description: 'Attributes for HTTP client and server spans',
    attributes: [
      { key: 'http.request.method', example: 'GET', description: 'HTTP request method' },
      { key: 'http.response.status_code', example: '200', description: 'HTTP response status code' },
      { key: 'url.path', example: '/api/orders', description: 'The URI path component' },
      { key: 'url.scheme', example: 'https', description: 'The URI scheme (http/https)' },
      { key: 'server.address', example: 'api.example.com', description: 'Server domain name' },
      { key: 'server.port', example: '443', description: 'Server port number' },
    ],
  },
  {
    name: 'Database',
    description: 'Attributes for database client spans',
    attributes: [
      { key: 'db.system', example: 'postgresql', description: 'Database management system' },
      { key: 'db.name', example: 'orders_db', description: 'Database name' },
      { key: 'db.operation', example: 'SELECT', description: 'Database operation type' },
      { key: 'db.statement', example: 'SELECT * FROM...', description: 'Database statement' },
      { key: 'db.user', example: 'app_user', description: 'Database user' },
    ],
  },
  {
    name: 'Service',
    description: 'Resource attributes identifying the service',
    attributes: [
      { key: 'service.name', example: 'order-service', description: 'Logical name of the service' },
      { key: 'service.version', example: '2.1.0', description: 'Version of the service' },
      { key: 'service.namespace', example: 'shop', description: 'Namespace for the service' },
      { key: 'service.instance.id', example: 'pod-abc123', description: 'Unique instance identifier' },
    ],
  },
  {
    name: 'Cloud',
    description: 'Resource attributes for cloud environments',
    attributes: [
      { key: 'cloud.provider', example: 'aws', description: 'Cloud provider (aws, gcp, azure)' },
      { key: 'cloud.region', example: 'us-east-1', description: 'Cloud region' },
      { key: 'cloud.availability_zone', example: 'us-east-1a', description: 'Availability zone' },
      { key: 'cloud.account.id', example: '123456789', description: 'Cloud account ID' },
    ],
  },
  {
    name: 'Kubernetes',
    description: 'Resource attributes for Kubernetes workloads',
    attributes: [
      { key: 'k8s.cluster.name', example: 'prod-cluster', description: 'Kubernetes cluster name' },
      { key: 'k8s.namespace.name', example: 'production', description: 'Kubernetes namespace' },
      { key: 'k8s.pod.name', example: 'order-svc-7f8d9', description: 'Pod name' },
      { key: 'k8s.deployment.name', example: 'order-service', description: 'Deployment name' },
      { key: 'k8s.node.name', example: 'node-pool-1-abc', description: 'Node name' },
    ],
  },
  {
    name: 'Host',
    description: 'Resource attributes for the host machine',
    attributes: [
      { key: 'host.name', example: 'prod-vm-03', description: 'Hostname' },
      { key: 'host.id', example: 'i-0abc123', description: 'Unique host identifier' },
      { key: 'host.type', example: 'm5.xlarge', description: 'Host/VM type' },
      { key: 'host.arch', example: 'amd64', description: 'CPU architecture' },
      { key: 'os.type', example: 'linux', description: 'Operating system type' },
      { key: 'os.version', example: '22.04', description: 'OS version' },
    ],
  },
  {
    name: 'Messaging',
    description: 'Attributes for messaging systems (Kafka, RabbitMQ, etc.)',
    attributes: [
      { key: 'messaging.system', example: 'kafka', description: 'Messaging system name' },
      { key: 'messaging.destination.name', example: 'orders', description: 'Topic/queue name' },
      { key: 'messaging.operation', example: 'publish', description: 'Operation type' },
      { key: 'messaging.message.id', example: 'msg-123', description: 'Message identifier' },
    ],
  },
];

export const resourceDetectionSources = [
  {
    detector: 'env',
    description: 'Environment variables',
    example: 'OTEL_SERVICE_NAME, OTEL_RESOURCE_ATTRIBUTES',
    attributes: ['service.name', 'deployment.environment'],
  },
  {
    detector: 'host',
    description: 'Local host information',
    example: 'Reads from OS',
    attributes: ['host.name', 'host.arch', 'os.type'],
  },
  {
    detector: 'process',
    description: 'Process runtime information',
    example: 'Reads from runtime',
    attributes: ['process.pid', 'process.executable.name', 'process.runtime.name'],
  },
  {
    detector: 'gcp',
    description: 'GCP metadata service',
    example: 'http://metadata.google.internal',
    attributes: ['cloud.provider', 'cloud.region', 'gcp.project.id'],
  },
  {
    detector: 'aws',
    description: 'AWS metadata service (EC2, ECS, EKS)',
    example: 'http://169.254.169.254',
    attributes: ['cloud.provider', 'cloud.region', 'cloud.account.id', 'host.id'],
  },
  {
    detector: 'azure',
    description: 'Azure metadata service',
    example: 'http://169.254.169.254',
    attributes: ['cloud.provider', 'cloud.region', 'azure.vm.name'],
  },
  {
    detector: 'k8s',
    description: 'Kubernetes Downward API',
    example: 'Environment variables injected by K8s',
    attributes: ['k8s.pod.name', 'k8s.namespace.name', 'k8s.node.name'],
  },
];

export const semConvBenefits = [
  {
    title: 'Vendor Neutrality',
    description: 'Same attribute names work across any observability backend',
  },
  {
    title: 'Consistent Queries',
    description: 'Query by service.name across all your telemetry, regardless of language or framework',
  },
  {
    title: 'Out-of-box Dashboards',
    description: 'Pre-built dashboards and alerts that work because data follows known conventions',
  },
  {
    title: 'Cross-team Collaboration',
    description: 'Teams using different languages produce telemetry with the same structure',
  },
];
