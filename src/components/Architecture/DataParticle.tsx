import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

export type SignalType = 'trace' | 'metric' | 'log';

interface DataParticleProps {
  type: SignalType;
  path: { x: number; y: number }[];
  delay?: number;
  duration?: number;
}

const signalColors: Record<SignalType, string> = {
  trace: '#60a5fa',
  metric: '#34d399',
  log: '#fbbf24',
};

export function DataParticle({ type, path, delay = 0, duration = 3 }: DataParticleProps) {
  const { isAnimating, activeSignal } = useAppContext();

  // Hide if signal filter is active and this isn't the active signal
  if (activeSignal !== 'all' && activeSignal !== `${type}s`) {
    return null;
  }

  if (!isAnimating) {
    return null;
  }

  const color = signalColors[type];
  
  // Generate evenly spaced times for the path points
  const pathTimes = path.map((_, i) => i / (path.length - 1));

  return (
    <motion.div
      className="absolute w-3 h-3 rounded-full pointer-events-none"
      style={{
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
        left: path[0].x,
        top: path[0].y,
      }}
      animate={{
        left: path.map(p => p.x),
        top: path.map(p => p.y),
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: duration * 0.3,
        ease: 'linear',
        times: pathTimes,
      }}
    />
  );
}

// Generate multiple particles for a path
export function ParticleStream({
  type,
  path,
  count = 3,
  baseDuration = 3,
  baseDelay = 0,
}: {
  type: SignalType;
  path: { x: number; y: number }[];
  count?: number;
  baseDuration?: number;
  baseDelay?: number;
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <DataParticle
          key={`${type}-${i}`}
          type={type}
          path={path}
          delay={baseDelay + i * (baseDuration / count)}
          duration={baseDuration}
        />
      ))}
    </>
  );
}
