import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, CheckCircle2, AlertCircle, Tag, Brain, Zap, Globe } from 'lucide-react';

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Overall Consensus - Hero Section */}
      {consensus?.overall_consensus && (
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-cyan-50 via-indigo-50 to-violet-50 dark:from-indigo-950/80 dark:via-violet-950/80 dark:to-cyan-950/80 border-2 border-cyan-400 dark:border-cyan-500/50 rounded-2xl p-8 shadow-2xl"
        >
          {/* Animated gradient overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-white/[0.12] dark:from-white/[0.12] via-transparent to-transparent pointer-events-none"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
          
          {/* Decorative elements */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-cyan-400/30 dark:bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-violet-400/30 dark:bg-violet-500/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-6">
              <motion.div 
                className="p-3 bg-gradient-to-br from-cyan-300 to-indigo-300 dark:from-cyan-500/40 dark:to-indigo-500/40 rounded-2xl backdrop-blur-sm border border-cyan-400 dark:border-white/20 shadow-xl"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(168, 85, 247, 0.3)',
                    '0 0 40px rgba(236, 72, 153, 0.3)',
                    '0 0 20px rgba(168, 85, 247, 0.3)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Brain className="w-7 h-7 text-indigo-900 dark:text-white" />
              </motion.div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-700 via-indigo-700 to-violet-700 dark:from-cyan-300 dark:via-indigo-300 dark:to-violet-300 bg-clip-text text-transparent mb-2">
                  AI Consensus Analysis
                </h2>
                <p className="text-sm text-indigo-800 dark:text-indigo-200/80 font-light">
                  Synthesized from {resultCount} sources across the internet
                </p>
              </div>
            </div>

            <motion.p 
              className="text-lg text-gray-900 dark:text-white leading-relaxed font-medium mb-6 pl-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {consensus.overall_consensus}
            </motion.p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-indigo-800 dark:text-cyan-200/90">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/60 dark:bg-white/10 backdrop-blur-sm rounded-lg border border-cyan-300 dark:border-white/20">
                <Sparkles className="w-4 h-4 text-cyan-700 dark:text-cyan-300" />
                <span className="font-medium">{resultCount} sources</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/60 dark:bg-white/10 backdrop-blur-sm rounded-lg border border-cyan-300 dark:border-white/20">
                <Globe className="w-4 h-4 text-violet-700 dark:text-violet-300" />
                <span className="font-medium">{domains.length} platforms</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/60 dark:bg-white/10 backdrop-blur-sm rounded-lg border border-cyan-300 dark:border-white/20">
                <Zap className="w-4 h-4 text-indigo-700 dark:text-indigo-300" />
                <span className="font-medium italic">"{query}"</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Consensus Details Grid */}
      {consensus && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Platform Insights */}
          {Object.keys(consensus.platform_insights).length > 0 && (
            <motion.div
              variants={itemVariants}
              className="backdrop-blur-xl bg-white/95 dark:bg-slate-900/70 border border-indigo-200 dark:border-slate-700/60 rounded-2xl p-6 shadow-xl hover:border-cyan-400 dark:hover:border-cyan-500/50 hover:shadow-cyan-400/20 dark:hover:shadow-cyan-500/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-cyan-100 dark:bg-cyan-500/20 rounded-xl border border-cyan-300 dark:border-cyan-500/30">
                  <TrendingUp className="w-5 h-5 text-cyan-700 dark:text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Platform Insights</h3>
              </div>

              <div className="space-y-3">
                {Object.entries(consensus.platform_insights).map(([platform, insight], index) => (
                  <motion.div
                    key={platform}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="group bg-gradient-to-br from-cyan-50 to-indigo-50 dark:from-white/5 dark:to-white/[0.02] rounded-xl p-4 border border-cyan-200 dark:border-white/10 hover:border-cyan-400 dark:hover:border-cyan-500/30 hover:bg-gradient-to-br hover:from-cyan-100 hover:to-indigo-100 dark:hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-600 dark:bg-cyan-400" />
                      <span className="font-bold text-cyan-800 dark:text-cyan-300 text-sm uppercase tracking-wider">
                        {platform.replace('.com', '').replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed pl-4">{insight}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Agreements */}
          {consensus.agreements.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="backdrop-blur-xl bg-white/95 dark:bg-slate-900/70 border border-indigo-200 dark:border-slate-700/60 rounded-2xl p-6 shadow-xl hover:border-emerald-400 dark:hover:border-emerald-500/50 hover:shadow-emerald-400/20 dark:hover:shadow-emerald-500/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-emerald-100 dark:bg-emerald-500/20 rounded-xl border border-emerald-300 dark:border-emerald-500/30">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Common Themes</h3>
              </div>

              <div className="space-y-3">
                {consensus.agreements.map((agreement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm p-3 rounded-lg bg-emerald-100 dark:bg-emerald-500/5 border border-emerald-300 dark:border-emerald-500/10 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
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
              className="backdrop-blur-xl bg-white/95 dark:bg-slate-900/70 border border-indigo-200 dark:border-slate-700/60 rounded-2xl p-6 shadow-xl hover:border-amber-400 dark:hover:border-amber-500/50 hover:shadow-amber-400/20 dark:hover:shadow-amber-500/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-amber-100 dark:bg-amber-500/20 rounded-xl border border-amber-300 dark:border-amber-500/30">
                  <AlertCircle className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Differing Views</h3>
              </div>

              <div className="space-y-3">
                {consensus.disagreements.map((disagreement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm p-3 rounded-lg bg-amber-100 dark:bg-amber-500/5 border border-amber-300 dark:border-amber-500/10 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors"
                  >
                    <AlertCircle className="w-4 h-4 text-amber-700 dark:text-amber-400 mt-0.5 flex-shrink-0" />
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
              className="backdrop-blur-xl bg-white/95 dark:bg-slate-900/70 border border-indigo-200 dark:border-slate-700/60 rounded-2xl p-6 shadow-xl hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:shadow-indigo-400/20 dark:hover:shadow-indigo-500/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl border border-indigo-300 dark:border-indigo-500/30">
                  <Tag className="w-5 h-5 text-indigo-700 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Top Mentions</h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {consensus.top_entities.map((entity, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.08 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-100 to-indigo-100 dark:from-cyan-500/20 dark:to-indigo-500/20 border border-cyan-300 dark:border-cyan-400/40 rounded-full text-sm text-cyan-900 dark:text-cyan-100 font-medium hover:from-cyan-200 hover:to-indigo-200 dark:hover:from-cyan-500/30 dark:hover:to-indigo-500/30 hover:border-cyan-400 dark:hover:border-cyan-400/60 transition-all cursor-default shadow-lg shadow-cyan-400/20 dark:shadow-cyan-500/10"
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
          className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-cyan-50 via-indigo-50 to-violet-50 dark:from-indigo-950/50 dark:via-violet-950/50 dark:to-cyan-950/50 border border-cyan-300 dark:border-cyan-500/40 rounded-2xl p-7 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent rounded-2xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-cyan-200 dark:bg-cyan-500/30 rounded-xl border border-cyan-300 dark:border-cyan-500/40">
                <Sparkles className="w-6 h-6 text-cyan-700 dark:text-cyan-200" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-700 to-indigo-700 dark:from-cyan-200 dark:to-indigo-200 bg-clip-text text-transparent">
                AI Research Insights
              </h2>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-cyan-100 dark:bg-white/5">
                <div className="mt-1 w-2 h-2 rounded-full bg-cyan-600 dark:bg-cyan-400 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                  Found <span className="font-bold text-cyan-800 dark:text-cyan-300">{resultCount}</span> relevant results for "{query}"
                </p>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg bg-indigo-100 dark:bg-white/5">
                <div className="mt-1 w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                  Searched across <span className="font-bold text-indigo-800 dark:text-indigo-300">{domains.length}</span> platforms: {domains.join(', ')}
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-violet-100 dark:bg-white/5">
                <div className="mt-1 w-2 h-2 rounded-full bg-violet-600 dark:bg-violet-400 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
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
