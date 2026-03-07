import { motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';

export const LoadingState = () => {
  return (
    <div className="space-y-4">
      {/* Loading header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="backdrop-blur-xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-2xl p-6 shadow-2xl"
      >
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-6 h-6 text-purple-400" />
          </motion.div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-100 mb-1">Searching across platforms...</h3>
            <p className="text-sm text-gray-400">Analyzing content and generating summaries</p>
          </div>
          <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
        </div>
      </motion.div>

      {/* Skeleton cards */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700/50 rounded-xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-700/50 rounded-lg animate-pulse" />
            <div className="h-4 bg-gray-700/50 rounded w-24 animate-pulse" />
          </div>
          
          <div className="space-y-3">
            <div className="h-6 bg-gray-700/50 rounded w-3/4 animate-pulse" />
            <div className="h-20 bg-purple-500/10 border border-purple-500/20 rounded-lg animate-pulse" />
            <div className="h-4 bg-gray-700/50 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-700/50 rounded w-2/3 animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};
