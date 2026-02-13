export interface LogRecord {
  timestamp: string;
  observedTimestamp: string;
  severityNumber: number;
  severityText: 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL';
  body: string;
  traceId?: string;
  spanId?: string;
  attributes: Record<string, string | number>;
  resource: Record<string, string>;
}

export const exampleLogs: LogRecord[] = [
  {
    timestamp: '2024-01-15T10:23:45.123Z',
    observedTimestamp: '2024-01-15T10:23:45.125Z',
    severityNumber: 9,
    severityText: 'INFO',
    body: 'Order created successfully',
    traceId: 'abc123def456789',
    spanId: 'span-003',
    attributes: {
      'order.id': 'ORD-789',
      'customer.id': 'CUST-123',
      'order.total': 149.99,
      'order.items_count': 3,
    },
    resource: {
      'service.name': 'order-service',
      'service.version': '2.1.0',
      'deployment.environment': 'production',
    },
  },
  {
    timestamp: '2024-01-15T10:23:45.150Z',
    observedTimestamp: '2024-01-15T10:23:45.152Z',
    severityNumber: 9,
    severityText: 'INFO',
    body: 'Payment processing initiated',
    traceId: 'abc123def456789',
    spanId: 'span-003',
    attributes: {
      'payment.method': 'credit_card',
      'payment.provider': 'stripe',
    },
    resource: {
      'service.name': 'order-service',
      'service.version': '2.1.0',
      'deployment.environment': 'production',
    },
  },
  {
    timestamp: '2024-01-15T10:23:44.800Z',
    observedTimestamp: '2024-01-15T10:23:44.802Z',
    severityNumber: 9,
    severityText: 'INFO',
    body: 'Incoming request: POST /api/orders',
    traceId: 'abc123def456789',
    spanId: 'span-002',
    attributes: {
      'http.request.method': 'POST',
      'url.path': '/api/orders',
      'client.address': '192.168.1.100',
    },
    resource: {
      'service.name': 'api-gateway',
      'service.version': '1.5.0',
      'deployment.environment': 'production',
    },
  },
  {
    timestamp: '2024-01-15T10:23:46.200Z',
    observedTimestamp: '2024-01-15T10:23:46.205Z',
    severityNumber: 13,
    severityText: 'WARN',
    body: 'Slow database query detected',
    traceId: 'abc123def456789',
    spanId: 'span-004',
    attributes: {
      'db.statement': 'SELECT * FROM inventory WHERE...',
      'db.duration_ms': 1250,
      'db.threshold_ms': 500,
    },
    resource: {
      'service.name': 'order-service',
      'service.version': '2.1.0',
      'deployment.environment': 'production',
    },
  },
];

export const logCorrelationExample = {
  description: 'Logs are automatically correlated with traces via trace_id and span_id',
  benefit: 'Jump from a log entry directly to the full distributed trace',
  fields: {
    trace_id: 'Links log to entire request flow across all services',
    span_id: 'Links log to specific operation within the trace',
  },
};

export const severityLevels = [
  { number: 1, text: 'TRACE', description: 'Finest-grained debugging info' },
  { number: 5, text: 'DEBUG', description: 'Debugging information' },
  { number: 9, text: 'INFO', description: 'Normal operational messages' },
  { number: 13, text: 'WARN', description: 'Warning conditions' },
  { number: 17, text: 'ERROR', description: 'Error conditions' },
  { number: 21, text: 'FATAL', description: 'System is unusable' },
];
