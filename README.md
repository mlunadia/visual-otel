# OpenTelemetry Visual Explorer

An interactive web application that visually explains how the OpenTelemetry ecosystem works together. Designed for enterprise decision makers who want to understand OTel without being observability experts.

## Features

- **Animated Architecture Diagram**: Visual representation of OTel data flow with animated particles for each signal type (traces, metrics, logs)
- **Interactive Components**: Click on any component to learn more about it
- **Signal-Specific Views**: Filter the visualization by signal type
- **Dark/Light Theme**: Toggle between themes
- **Detailed Panels**: In-depth explanations of:
  - OTel SDK and instrumentation
  - Collector pipeline (receivers, processors, exporters)
  - Semantic Conventions
  - Resource Detection
  - Traces, Metrics, and Logs

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

```
src/
├── components/
│   ├── Architecture/    # Diagram components (nodes, particles)
│   ├── Panels/          # Detail panels for each concept
│   ├── UI/              # Reusable UI components
│   └── Layout/          # Header, Sidebar
├── context/             # React context for app state
├── data/                # Example data and configurations
└── hooks/               # Custom React hooks
```

## Deployment

Build the static files and serve from any static hosting:

```bash
npm run build
# Output in dist/ directory
```

For Mac Mini hosting, you can use nginx or any static file server to serve the `dist/` directory.

## License

MIT
