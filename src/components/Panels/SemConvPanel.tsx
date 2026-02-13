import { motion } from 'framer-motion';
import { semanticConventions, semConvBenefits } from '../../data/semConvExamples';
import { InsightCard } from '../UI/InsightCard';
import { BookOpen, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export function SemConvPanel() {
  const [selectedCategory, setSelectedCategory] = useState(semanticConventions[0].name);
  const category = semanticConventions.find(c => c.name === selectedCategory)!;

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <p className="text-[var(--text-secondary)] leading-relaxed">
        <strong className="text-[var(--text-primary)]">Semantic Conventions</strong> are standardized 
        attribute names defined by OpenTelemetry. Using consistent names enables interoperability 
        and portability across tools.
      </p>

      {/* Benefits */}
      <div className="grid grid-cols-2 gap-2">
        {semConvBenefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]"
          >
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="font-medium text-sm text-[var(--text-primary)]">{benefit.title}</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">{benefit.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Category Selector */}
      <div className="space-y-3">
        <h3 className="font-medium text-[var(--text-primary)]">Convention Categories</h3>
        <div className="flex flex-wrap gap-2">
          {semanticConventions.map((cat) => (
            <motion.button
              key={cat.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === cat.name
                  ? 'bg-[var(--otel-blue)] text-white'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
              }`}
            >
              {cat.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Selected Category Details */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[var(--otel-blue)]" />
          <h3 className="font-medium text-[var(--text-primary)]">{category.name} Attributes</h3>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">{category.description}</p>
        
        <div className="rounded-lg border border-[var(--border-color)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--bg-tertiary)]">
                <th className="px-3 py-2 text-left font-medium text-[var(--text-primary)]">Attribute</th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-primary)]">Example</th>
              </tr>
            </thead>
            <tbody>
              {category.attributes.map((attr, index) => (
                <tr
                  key={attr.key}
                  className={index % 2 === 0 ? 'bg-[var(--bg-secondary)]' : 'bg-[var(--bg-primary)]'}
                >
                  <td className="px-3 py-2">
                    <code className="font-mono text-xs text-cyan-400">{attr.key}</code>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">{attr.description}</p>
                  </td>
                  <td className="px-3 py-2">
                    <code className="font-mono text-xs text-amber-300">{attr.example}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Example Usage */}
      <div className="space-y-3">
        <h3 className="font-medium text-[var(--text-primary)]">Example: HTTP Span</h3>
        <div className="bg-[var(--bg-secondary)] rounded-lg p-4 font-mono text-xs space-y-1 border border-[var(--border-color)]">
          <div className="text-[var(--text-secondary)]">{"{"}</div>
          <div className="pl-4">
            <span className="text-cyan-400">"name"</span>
            <span className="text-gray-400">: </span>
            <span className="text-amber-300">"GET /api/orders"</span>
            <span className="text-gray-400">,</span>
          </div>
          <div className="pl-4">
            <span className="text-cyan-400">"attributes"</span>
            <span className="text-gray-400">: {"{"}</span>
          </div>
          <div className="pl-8">
            <span className="text-cyan-400">"http.request.method"</span>
            <span className="text-gray-400">: </span>
            <span className="text-amber-300">"GET"</span>
            <span className="text-gray-400">,</span>
          </div>
          <div className="pl-8">
            <span className="text-cyan-400">"http.response.status_code"</span>
            <span className="text-gray-400">: </span>
            <span className="text-purple-400">200</span>
            <span className="text-gray-400">,</span>
          </div>
          <div className="pl-8">
            <span className="text-cyan-400">"url.path"</span>
            <span className="text-gray-400">: </span>
            <span className="text-amber-300">"/api/orders"</span>
            <span className="text-gray-400">,</span>
          </div>
          <div className="pl-8">
            <span className="text-cyan-400">"server.address"</span>
            <span className="text-gray-400">: </span>
            <span className="text-amber-300">"api.example.com"</span>
          </div>
          <div className="pl-4 text-gray-400">{"}"}</div>
          <div className="text-[var(--text-secondary)]">{"}"}</div>
        </div>
      </div>

      {/* Insight */}
      <InsightCard title="Why This Matters" variant="info">
        <p>
          When everyone uses <code className="text-cyan-400">http.request.method</code> instead of 
          inventing <code className="text-gray-500">httpMethod</code>, <code className="text-gray-500">method</code>, 
          or <code className="text-gray-500">req_method</code>, dashboards and alerts work out of the box.
        </p>
      </InsightCard>
    </div>
  );
}
