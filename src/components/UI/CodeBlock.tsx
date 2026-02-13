import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language = 'yaml', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting for YAML
  const highlightYaml = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Comments
      if (line.trim().startsWith('#')) {
        return <span key={i} className="text-gray-500">{line}</span>;
      }
      
      // Key-value pairs
      const keyMatch = line.match(/^(\s*)([a-zA-Z0-9_.-]+)(:)/);
      if (keyMatch) {
        const [, indent, key, colon] = keyMatch;
        const rest = line.slice(keyMatch[0].length);
        return (
          <span key={i}>
            {indent}
            <span className="text-cyan-400">{key}</span>
            <span className="text-gray-400">{colon}</span>
            <span className="text-amber-300">{rest}</span>
          </span>
        );
      }
      
      // List items
      if (line.trim().startsWith('-')) {
        const indent = line.match(/^(\s*)/)?.[1] || '';
        const content = line.trim().slice(1);
        return (
          <span key={i}>
            {indent}
            <span className="text-pink-400">-</span>
            <span className="text-amber-300">{content}</span>
          </span>
        );
      }
      
      return <span key={i}>{line}</span>;
    });
  };

  // Simple JSON highlighting
  const highlightJson = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Keys in quotes
      const withHighlightedKeys = line.replace(
        /"([^"]+)":/g,
        '<span class="text-cyan-400">"$1"</span>:'
      );
      // String values
      const withHighlightedValues = withHighlightedKeys.replace(
        /: "([^"]+)"/g,
        ': <span class="text-amber-300">"$1"</span>'
      );
      // Numbers
      const withHighlightedNumbers = withHighlightedValues.replace(
        /: (\d+\.?\d*)/g,
        ': <span class="text-purple-400">$1</span>'
      );
      
      return (
        <span key={i} dangerouslySetInnerHTML={{ __html: withHighlightedNumbers }} />
      );
    });
  };

  const highlight = language === 'json' ? highlightJson : highlightYaml;

  return (
    <div className="rounded-lg overflow-hidden border border-[var(--border-color)]">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-[var(--bg-tertiary)] border-b border-[var(--border-color)]">
          <span className="text-sm font-medium text-[var(--text-secondary)]">{title}</span>
          <span className="text-xs px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
            {language}
          </span>
        </div>
      )}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="absolute top-3 right-3 p-1.5 rounded-md bg-[var(--bg-tertiary)] hover:bg-[var(--border-color)] transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-[var(--text-secondary)]" />
          )}
        </motion.button>
        <pre className="p-4 overflow-x-auto text-sm bg-[var(--bg-secondary)]">
          <code className="font-mono leading-relaxed">
            {highlight(code).map((line, i) => (
              <span key={i}>
                {line}
                {i < code.split('\n').length - 1 && '\n'}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
