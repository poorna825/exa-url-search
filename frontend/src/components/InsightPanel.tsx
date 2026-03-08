import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, CheckCircle2, AlertCircle, Tag, Brain } from 'lucide-react';

interface ConsensusInsight {
  platform_insights: Record<string, string>;
  agreements: string[];
  disagreements: string[];
  top_entities: string[];
  overall_consensus: string;
}

interface InsightPanelProps {
  query: string;
  resultCount: number;
  domains: string[];
  consensus: ConsensusInsight | null;
}

export const InsightPanel = ({ query, resultCount, domains, consensus }: InsightPanelProps) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Overall Consensus - Hero Section */}
      {consensus?.overall_consensus && (
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-purple-900/50 via-pink-900/50 to-blue-900/50 border border-purple-500/40 rounded-xl p-6 shadow-2xl"
        >
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl backdrop-blur-sm border border-white/10">
                <Brain className="w-6 h-6 text-purple-200" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 bg-clip-text text-transparent">
                Internet Consensus
              </h2>
            </div>

            <p className="text-lg text-gray-100 leading-relaxed font-medium mb-4 pl-1">
              {consensus.overall_consensus}
            </p>

            <div className="flex items-center gap-3 text-sm text-gray-300">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-300" />
                <span>{resultCount} sources</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-500" />
              <span>{domains.length} platforms</span>
              <div className="w-1 h-1 rounded-full bg-gray-500" />
              <span className="text-purple-300">"{query}"</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Consensus Details Grid */}
      {consensus && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Platform Insights */}
          {Object.keys(consensus.platform_insights).length > 0 && (
            <motion.div
              variants={itemVariants}
              className="backdrop-blur-xl bg-gray-900/60 border border-gray-700/50 rounded-xl p-5 shadow-xl hover:border-purple-500/40 transition-all duration-300"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-100">Platform Insights</h3>
              </div>

              <div className="space-y-3">
                {Object.entries(consensus.platform_insights).map(([platform, insight], index) => (
                  <motion.div
                    key={platform}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 rounded-lg p-3 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="font-semibold text-purple-300 text-sm mb-1.5 capitalize">
                      {platform.replace('.com', '').replace('_', ' ')}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{insight}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Agreements */}
          {consensus.agreements.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="backdrop-blur-xl bg-gray-900/60 border border-gray-700/50 rounded-xl p-5 shadow-xl hover:border-green-500/40 transition-all duration-300"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-100">Common Themes</h3>
              </div>

              <div className="space-y-2.5">
                {consensus.agreements.map((agreement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2.5 text-gray-300 text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{agreement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Disagreements */}
          {consensus.disagreements.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="backdrop-blur-xl bg-gray-900/60 border border-gray-700/50 rounded-xl p-5 shadow-xl hover:border-orange-500/40 transition-all duration-300"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-100">Differing Views</h3>
              </div>

              <div className="space-y-2.5">
                {consensus.disagreements.map((disagreement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2.5 text-gray-300 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{disagreement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Top Entities */}
          {consensus.top_entities.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="backdrop-blur-xl bg-gray-900/60 border border-gray-700/50 rounded-xl p-5 shadow-xl hover:border-blue-500/40 transition-all duration-300"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Tag className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-100">Top Mentions</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {consensus.top_entities.map((entity, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full text-sm text-blue-200 font-medium hover:from-blue-500/30 hover:to-purple-500/30 transition-all cursor-default"
                  >
                    {entity}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Fallback when no consensus available */}
      {!consensus && (
        <motion.div
          variants={itemVariants}
          className="backdrop-blur-xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-xl p-6 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent rounded-xl pointer-events-none" />
          
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
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
