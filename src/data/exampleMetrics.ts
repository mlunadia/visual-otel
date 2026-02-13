export interface MetricDataPoint {
  timestamp: number;
  value: number;
}

export interface Counter {
  name: string;
  description: string;
  unit: string;
  value: number;
  attributes: Record<string, string>;
}

export interface Gauge {
  name: string;
  description: string;
  unit: string;
  value: number;
  attributes: Record<string, string>;
}

export interface Histogram {
  name: string;
  description: string;
  unit: string;
  count: number;
  sum: number;
  buckets: { le: number; count: number }[];
  percentiles: { p50: number; p95: number; p99: number };
  attributes: Record<string, string>;
}

export const exampleCounters: Counter[] = [
  {
    name: 'http.server.request.total',
    description: 'Total number of HTTP requests received',
    unit: '1',
    value: 15847,
    attributes: {
      'http.request.method': 'GET',
      'http.response.status_code': '200',
      'service.name': 'api-gateway',
    },
  },
  {
    name: 'orders.created.total',
    description: 'Total number of orders created',
    unit: '1',
    value: 1234,
    attributes: {
      'service.name': 'order-service',
      'order.type': 'standard',
    },
  },
];

export const exampleGauges: Gauge[] = [
  {
    name: 'process.runtime.cpython.cpu.utilization',
    description: 'CPU utilization of the Python process',
    unit: '%',
    value: 67.3,
    attributes: {
      'service.name': 'order-service',
      'host.name': 'prod-vm-03',
    },
  },
  {
    name: 'process.runtime.memory.usage',
    description: 'Memory usage of the process',
    unit: 'MB',
    value: 512,
    attributes: {
      'service.name': 'api-gateway',
      'host.name': 'prod-vm-02',
    },
  },
  {
    name: 'system.memory.utilization',
    description: 'System memory utilization',
    unit: '%',
    value: 78.5,
    attributes: {
      'host.name': 'prod-vm-03',
    },
  },
];

export const exampleHistogram: Histogram = {
  name: 'http.server.request.duration',
  description: 'Duration of HTTP server requests',
  unit: 'ms',
  count: 15847,
  sum: 892450,
  buckets: [
    { le: 10, count: 2450 },
    { le: 25, count: 5200 },
    { le: 50, count: 9800 },
    { le: 100, count: 13200 },
    { le: 250, count: 15100 },
    { le: 500, count: 15600 },
    { le: 1000, count: 15800 },
    { le: Infinity, count: 15847 },
  ],
  percentiles: {
    p50: 45,
    p95: 230,
    p99: 890,
  },
  attributes: {
    'http.request.method': 'GET',
    'service.name': 'api-gateway',
  },
};

export const metricTypeExplanations = {
  counter: {
    name: 'Counter',
    description: 'Monotonically increasing value. Only goes up (or resets to zero).',
    useCase: 'Request counts, errors, bytes processed',
    example: 'http_requests_total: 1,847 → 1,848 → 1,849',
  },
  gauge: {
    name: 'Gauge',
    description: 'Point-in-time value that can go up or down.',
    useCase: 'Temperature, memory usage, queue size',
    example: 'cpu_utilization: 67% → 72% → 65%',
  },
  histogram: {
    name: 'Histogram',
    description: 'Distribution of values across buckets. Captures count, sum, and bucket counts.',
    useCase: 'Request latency, response sizes',
    example: 'Calculate p50, p95, p99 percentiles',
  },
};
