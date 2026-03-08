import { motion } from 'framer-motion';
import { TrendingUp, Clock, ArrowUpRight } from 'lucide-react';

export const TrendWidget = () => {
  const trendingTopics = [
    { topic: 'AI Development', growth: '+45%', color: 'text-green-400' },
    { topic: 'React Best Practices', growth: '+32%', color: 'text-blue-400' },
    { topic: 'TypeScript Tips', growth: '+28%', color: 'text-purple-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="backdrop-blur-xl bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-slate-900/95 dark:to-slate-800/95 border border-indigo-200 dark:border-slate-700/60 rounded-2xl p-6 shadow-2xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-emerald-100 dark:bg-emerald-500/20 rounded-xl border border-emerald-300 dark:border-emerald-500/30">
          <TrendingUp className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Trending Now</h3>
          <p className="text-xs text-gray-500">What's hot today</p>
        </div>
      </div>

      <div className="space-y-3">
        {trendingTopics.map((item, index) => (
          <motion.div
            key={item.topic}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ x: 4, scale: 1.02 }}
            className="group relative flex items-center justify-between p-4 bg-gradient-to-r from-cyan-50 to-indigo-50 dark:from-slate-800/50 dark:to-slate-800/30 rounded-xl border border-indigo-200 dark:border-slate-700/40 hover:border-cyan-400 dark:hover:border-cyan-500/40 hover:from-cyan-100 hover:to-indigo-100 dark:hover:from-cyan-500/10 dark:hover:to-indigo-500/10 transition-all cursor-pointer overflow-hidden"
          >
            {/* Hover gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative flex items-center gap-3 flex-1 min-w-0">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
                className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors font-medium truncate block">
                  {item.topic}
                </span>
              </div>
            </div>
            
            <div className="relative flex items-center gap-2">
              <span className={`text-xs font-bold ${item.color}`}>{item.growth}</span>
              <ArrowUpRight className={`w-3 h-3 ${item.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-6 pt-5 border-t border-indigo-200 dark:border-slate-700/50 flex items-center justify-between text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center gap-2 text-gray-500">
          <Clock className="w-3.5 h-3.5" />
          <span>Updated 2 hours ago</span>
        </div>
        <button className="text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 font-medium transition-colors">
          View all →
        </button>
      </motion.div>
    </motion.div>
  );
};
