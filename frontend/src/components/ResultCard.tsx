import { motion } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';
import { PlatformIcon } from './PlatformIcon';

interface ResultCardProps {
  title: string;
  url: string;
  snippet: string;
  summary: string;
  domain: string;
  index: number;
}

export const ResultCard = ({ title, url, snippet, summary, domain, index }: ResultCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-500/10"
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-xl pointer-events-none" />
      
      <div className="relative z-10">
        {/* Header with platform icon and domain */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-1">
            <PlatformIcon domain={domain} />
            <span className="text-xs text-gray-400 font-medium">{domain}</span>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${title} in new tab`}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ExternalLink className="w-4 h-4 text-gray-400 hover:text-purple-400 transition-colors" />
          </a>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-100 hover:text-purple-400 transition-colors bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text hover:from-purple-400 hover:to-pink-400"
          >
            {title}
          </a>
        </h3>

        {/* AI Summary */}
        {summary && (
          <div className="mb-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-purple-300 font-semibold">AI Summary</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Snippet */}
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{snippet}</p>

        {/* URL */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 text-xs text-gray-500 hover:text-purple-400 transition-colors inline-block truncate max-w-full"
        >
          {url}
        </a>
      </div>

      {/* Gradient accent on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-b-xl" />
    </motion.article>
  );
};
