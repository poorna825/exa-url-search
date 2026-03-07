import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Clock } from 'lucide-react';

interface InsightPanelProps {
  query: string;
  resultCount: number;
  domains: string[];
}

export const InsightPanel = ({ query, resultCount, domains }: InsightPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-2xl p-6 mb-6 shadow-2xl"
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent rounded-2xl pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Sparkles className="w-5 h-5 text-purple-300" />
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            AI Research Insights
          </h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-purple-400" />
            <p className="text-gray-300 leading-relaxed">
              Found <span className="font-bold text-purple-300">{resultCount}</span> relevant results for "{query}"
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-pink-400" />
            <p className="text-gray-300 leading-relaxed">
              Searched across <span className="font-bold text-pink-300">{domains.length}</span> platforms: {domains.join(', ')}
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400" />
            <p className="text-gray-300 leading-relaxed">
              Results are ranked by relevance and enriched with AI-powered summaries
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-xs text-gray-400 font-medium">Quality Score</span>
            </div>
            <p className="text-2xl font-bold text-gray-100">High</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-gray-400 font-medium">Search Time</span>
            </div>
            <p className="text-2xl font-bold text-gray-100">~2s</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
