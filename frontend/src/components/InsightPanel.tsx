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
    visible: { opacity: 1, y: 0 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.6,
        staggerChildren: 0.15,
        ease: 'easeOut'
      }}
      className="space-y-8"
    >
      {/* Overall Consensus - Hero Section */}
      {consensus?.overall_consensus && (
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-cyan-50 via-indigo-50 to-violet-50 dark:from-indigo-950/90 dark:via-violet-950/90 dark:to-cyan-950/90 border-2 border-cyan-400 dark:border-cyan-500/60 rounded-3xl p-12 shadow-2xl"
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
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-400/30 dark:bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-violet-400/30 dark:bg-violet-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-400/20 dark:bg-indigo-500/10 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <div className="flex items-start gap-6 mb-8">
              <motion.div 
                className="p-4 bg-gradient-to-br from-cyan-300 to-indigo-300 dark:from-cyan-500/50 dark:to-indigo-500/50 rounded-3xl backdrop-blur-sm border border-cyan-400 dark:border-white/30 shadow-2xl"
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(168, 85, 247, 0.4)',
                    '0 0 50px rgba(236, 72, 153, 0.4)',
                    '0 0 30px rgba(168, 85, 247, 0.4)',
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Brain className="w-10 h-10 text-indigo-900 dark:text-white" />
              </motion.div>
              <div className="flex-1">
                <motion.h2 
                  className="text-4xl font-bold bg-gradient-to-r from-cyan-700 via-indigo-700 to-violet-700 dark:from-cyan-300 dark:via-indigo-300 dark:to-violet-300 bg-clip-text text-transparent mb-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  AI Consensus Intelligence
                </motion.h2>
                <motion.p 
                  className="text-xl text-indigo-800 dark:text-indigo-200/90 font-light leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Synthesized insights from {resultCount} sources across {domains.length} platforms
                </motion.p>
              </div>
            </div>

            <motion.p 
              className="text-2xl text-gray-900 dark:text-white leading-relaxed font-medium mb-10 pl-2 border-l-4 border-cyan-400 dark:border-cyan-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {consensus.overall_consensus}
            </motion.p>

            <motion.div 
              className="flex flex-wrap items-center justify-center gap-6 text-base text-indigo-800 dark:text-cyan-200/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-3 px-4 py-3 bg-white/70 dark:bg-white/15 backdrop-blur-sm rounded-2xl border border-cyan-300 dark:border-white/30 shadow-lg">
                <Sparkles className="w-5 h-5 text-cyan-700 dark:text-cyan-300" />
                <span className="font-semibold">{resultCount} sources analyzed</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-white/70 dark:bg-white/15 backdrop-blur-sm rounded-2xl border border-cyan-300 dark:border-white/30 shadow-lg">
                <Globe className="w-5 h-5 text-violet-700 dark:text-violet-300" />
                <span className="font-semibold">{domains.length} platforms searched</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-white/70 dark:bg-white/15 backdrop-blur-sm rounded-2xl border border-cyan-300 dark:border-white/30 shadow-lg">
                <Zap className="w-5 h-5 text-indigo-700 dark:text-indigo-300" />
                <span className="font-semibold italic">"{query}"</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Consensus Details Grid */}
      {consensus && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Platform Insights */}
          {Object.keys(consensus.platform_insights).length > 0 && (
            <motion.div
              variants={itemVariants}
              className="backdrop-blur-xl bg-white/95 dark:bg-slate-900/80 border border-indigo-200 dark:border-slate-700/70 rounded-3xl p-8 shadow-2xl hover:border-cyan-400 dark:hover:border-cyan-500/60 hover:shadow-cyan-400/30 dark:hover:shadow-cyan-500/20 transition-all duration-500"
            >
              <motion.div 
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="p-3 bg-cyan-100 dark:bg-cyan-500/20 rounded-2xl border border-cyan-300 dark:border-cyan-500/30">
                  <TrendingUp className="w-6 h-6 text-cyan-700 dark:text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Platform Intelligence</h3>
              </motion.div>

              <div className="space-y-6">
                {Object.entries(consensus.platform_insights).map(([platform, insight], index) => (
                  <motion.div
                    key={platform}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.15 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="group relative bg-gradient-to-br from-cyan-50 to-indigo-50 dark:from-white/8 dark:to-white/[0.02] rounded-2xl p-6 border border-cyan-200 dark:border-white/15 hover:border-cyan-400 dark:hover:border-cyan-500/40 hover:bg-gradient-to-br hover:from-cyan-100 hover:to-indigo-100 dark:hover:bg-white/12 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {/* Decorative gradient */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-200/20 dark:bg-cyan-500/10 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-cyan-600 dark:bg-cyan-400 shadow-lg shadow-cyan-400/50" />
                        <span className="font-bold text-cyan-800 dark:text-cyan-300 text-lg uppercase tracking-wider">
                          {platform.replace('.com', '').replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed pl-6">{insight}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Agreements */}
          {consensus.agreements.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="backdrop-blur-xl bg-white/95 dark:bg-slate-900/80 border border-indigo-200 dark:border-slate-700/70 rounded-3xl p-8 shadow-2xl hover:border-emerald-400 dark:hover:border-emerald-500/60 hover:shadow-emerald-400/30 dark:hover:shadow-emerald-500/20 transition-all duration-500"
            >
              <motion.div 
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="p-3 bg-emerald-100 dark:bg-emerald-500/20 rounded-2xl border border-emerald-300 dark:border-emerald-500/30">
                  <CheckCircle2 className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Cross-Platform Agreements</h3>
              </motion.div>

              <div className="space-y-5">
                {consensus.agreements.map((agreement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 8 }}
                    className="flex items-start gap-4 text-gray-700 dark:text-gray-300 text-base p-5 rounded-2xl bg-emerald-100 dark:bg-emerald-500/8 border border-emerald-300 dark:border-emerald-500/15 hover:bg-emerald-50 dark:hover:bg-emerald-500/12 hover:border-emerald-400 dark:hover:border-emerald-500/30 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400 mt-1 flex-shrink-0" />
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
              className="backdrop-blur-xl bg-white/95 dark:bg-slate-900/80 border border-indigo-200 dark:border-slate-700/70 rounded-3xl p-8 shadow-2xl hover:border-amber-400 dark:hover:border-amber-500/60 hover:shadow-amber-400/30 dark:hover:shadow-amber-500/20 transition-all duration-500"
            >
              <motion.div 
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="p-3 bg-amber-100 dark:bg-amber-500/20 rounded-2xl border border-amber-300 dark:border-amber-500/30">
                  <AlertCircle className="w-6 h-6 text-amber-700 dark:text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Alternative Perspectives</h3>
              </motion.div>

              <div className="space-y-5">
                {consensus.disagreements.map((disagreement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 8 }}
                    className="flex items-start gap-4 text-gray-700 dark:text-gray-300 text-base p-5 rounded-2xl bg-amber-100 dark:bg-amber-500/8 border border-amber-300 dark:border-amber-500/15 hover:bg-amber-50 dark:hover:bg-amber-500/12 hover:border-amber-400 dark:hover:border-amber-500/30 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <AlertCircle className="w-5 h-5 text-amber-700 dark:text-amber-400 mt-1 flex-shrink-0" />
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
              className="backdrop-blur-xl bg-white/95 dark:bg-slate-900/80 border border-indigo-200 dark:border-slate-700/70 rounded-3xl p-8 shadow-2xl hover:border-indigo-400 dark:hover:border-indigo-500/60 hover:shadow-indigo-400/30 dark:hover:shadow-indigo-500/20 transition-all duration-500"
            >
              <motion.div 
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="p-3 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl border border-indigo-300 dark:border-indigo-500/30">
                  <Tag className="w-6 h-6 text-indigo-700 dark:text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Key Entities & Topics</h3>
              </motion.div>

              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {consensus.top_entities.map((entity, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-5 py-3 bg-gradient-to-r from-cyan-100 to-indigo-100 dark:from-cyan-500/25 dark:to-indigo-500/25 border border-cyan-300 dark:border-cyan-400/50 rounded-2xl text-base text-cyan-900 dark:text-cyan-100 font-semibold hover:from-cyan-200 hover:to-indigo-200 dark:hover:from-cyan-500/35 dark:hover:to-indigo-500/35 hover:border-cyan-400 dark:hover:border-cyan-400/70 transition-all duration-300 shadow-lg shadow-cyan-400/30 dark:shadow-cyan-500/20 cursor-default"
                  >
                    {entity}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>
      )}

      {/* Fallback when no consensus available */}
      {!consensus && (
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-cyan-50 via-indigo-50 to-violet-50 dark:from-indigo-950/60 dark:via-violet-950/60 dark:to-cyan-950/60 border-2 border-cyan-300 dark:border-cyan-500/50 rounded-3xl p-10 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.1] via-transparent to-transparent rounded-3xl pointer-events-none" />
          
          <div className="relative z-10 text-center">
            <motion.div 
              className="flex items-center justify-center gap-4 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="p-3 bg-cyan-200 dark:bg-cyan-500/30 rounded-2xl border border-cyan-300 dark:border-cyan-500/40">
                <Sparkles className="w-8 h-8 text-cyan-700 dark:text-cyan-200" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-700 to-indigo-700 dark:from-cyan-200 dark:to-indigo-200 bg-clip-text text-transparent">
                AI Research Intelligence
              </h2>
            </motion.div>

            <div className="space-y-6 max-w-2xl mx-auto">
              <motion.div 
                className="flex items-start gap-4 p-5 rounded-2xl bg-cyan-100 dark:bg-white/8 border border-cyan-300 dark:border-white/20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="mt-1 w-3 h-3 rounded-full bg-cyan-600 dark:bg-cyan-400 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg">
                  Found <span className="font-bold text-cyan-800 dark:text-cyan-300">{resultCount}</span> relevant results for "{query}"
                </p>
              </motion.div>
              
              <motion.div 
                className="flex items-start gap-4 p-5 rounded-2xl bg-indigo-100 dark:bg-white/8 border border-indigo-300 dark:border-white/20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="mt-1 w-3 h-3 rounded-full bg-indigo-600 dark:bg-indigo-400 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg">
                  Searched across <span className="font-bold text-indigo-800 dark:text-indigo-300">{domains.length}</span> platforms: {domains.join(', ')}
                </p>
              </motion.div>

              <motion.div 
                className="flex items-start gap-4 p-5 rounded-2xl bg-violet-100 dark:bg-white/8 border border-violet-300 dark:border-white/20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="mt-1 w-3 h-3 rounded-full bg-violet-600 dark:bg-violet-400 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg">
                  Results are ranked by relevance and enriched with AI-powered summaries
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
