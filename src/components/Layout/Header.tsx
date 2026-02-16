import { ThemeToggle } from '../UI/ThemeToggle';
import { SignalTabs } from '../UI/SignalTabs';
import { Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

export function Header() {
  const { isAnimating, setIsAnimating } = useAppContext();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-[1800px] mx-auto px-3 py-2 md:px-6 md:py-4">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-y-2">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://opentelemetry.io/img/logos/opentelemetry-logo-nav.png" 
                alt="OpenTelemetry" 
                className="w-10 h-10"
              />
              <div>
                <h1 className="text-xl font-bold text-[var(--text-primary)]">
                  OpenTelemetry Visual Guide
                </h1>
                <p className="text-xs text-[var(--text-secondary)] hidden md:block">
                  A visual walkthrough of an OTel pipeline
                </p>
              </div>
            </div>
          </div>

          {/* Signal Tabs — row 2 on mobile, inline on desktop */}
          <div className="order-3 md:order-none w-full md:w-auto">
            <SignalTabs />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 md:gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAnimating(!isAnimating)}
              className={`flex items-center gap-2 px-3 py-2 md:px-4 rounded-lg border transition-colors ${
                isAnimating
                  ? 'bg-green-500/20 border-green-500/50 text-green-400'
                  : 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)]'
              }`}
            >
              {isAnimating ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span className="text-sm font-medium hidden md:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span className="text-sm font-medium hidden md:inline">Play</span>
                </>
              )}
            </motion.button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
