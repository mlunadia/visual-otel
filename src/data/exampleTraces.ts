export interface Span {
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  name: string;
  serviceName: string;
  kind: 'server' | 'client' | 'internal' | 'producer' | 'consumer';
  startTime: number;
  duration: number;
  status: 'ok' | 'error';
  attributes: Record<string, string | number>;
  events?: { name: string; timestamp: number; attributes?: Record<string, string> }[];
}

export const exampleTrace: Span[] = [
  {
    traceId: 'abc123def456789',
    spanId: 'span-001',
    name: 'GET /checkout',
    serviceName: 'web-frontend',
    kind: 'server',
    startTime: 0,
    duration: 450,
    status: 'ok',
    attributes: {
      'http.request.method': 'GET',
      'http.response.status_code': 200,
      'url.path': '/checkout',
      'url.scheme': 'https',
      'user_agent.original': 'Mozilla/5.0...',
      'client.address': '192.168.1.100',
    },
  },
  {
    traceId: 'abc123def456789',
    spanId: 'span-002',
    parentSpanId: 'span-001',
    name: 'POST /api/orders',
    serviceName: 'api-gateway',
    kind: 'server',
    startTime: 20,
    duration: 380,
    status: 'ok',
    attributes: {
      'http.request.method': 'POST',
      'http.response.status_code': 201,
      'url.path': '/api/orders',
      'rpc.system': 'grpc',
    },
  },
  {
    traceId: 'abc123def456789',
    spanId: 'span-003',
    parentSpanId: 'span-002',
    name: 'OrderService.CreateOrder',
    serviceName: 'order-service',
    kind: 'server',
    startTime: 50,
    duration: 320,
    status: 'ok',
    attributes: {
      'rpc.method': 'CreateOrder',
      'rpc.service': 'OrderService',
    },
  },
  {
    traceId: 'abc123def456789',
    spanId: 'span-004',
    parentSpanId: 'span-003',
    name: 'INSERT orders',
    serviceName: 'order-service',
    kind: 'client',
    startTime: 80,
    duration: 45,
    status: 'ok',
    attributes: {
      'db.system': 'postgresql',
      'db.name': 'orders_db',
      'db.operation': 'INSERT',
      'db.statement': 'INSERT INTO orders (id, customer_id, total) VALUES ($1, $2, $3)',
    },
  },
  {
    traceId: 'abc123def456789',
    spanId: 'span-005',
    parentSpanId: 'span-003',
    name: 'PUBLISH order.created',
    serviceName: 'order-service',
    kind: 'producer',
    startTime: 140,
    duration: 15,
    status: 'ok',
    attributes: {
      'messaging.system': 'kafka',
      'messaging.destination.name': 'order.created',
      'messaging.operation': 'publish',
    },
    events: [
      {
        name: 'message.sent',
        timestamp: 150,
        attributes: { 'messaging.message.id': 'msg-789' },
      },
    ],
  },
];

export const traceContextPropagation = {
  headers: {
    'traceparent': '00-abc123def456789-span-002-01',
    'tracestate': 'elastic=s:1.0',
  },
  description: 'W3C Trace Context headers automatically propagated between services',
};
