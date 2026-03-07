import { motion } from 'framer-motion';
import { TrendingUp, Clock } from 'lucide-react';

export const TrendWidget = () => {
  const trendingTopics = [
    { topic: 'AI Development', growth: '+45%' },
    { topic: 'React Best Practices', growth: '+32%' },
    { topic: 'TypeScript Tips', growth: '+28%' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700/50 rounded-2xl p-6 shadow-xl"
    >
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-green-400" />
        <h3 className="text-lg font-semibold text-gray-100">Trending Now</h3>
      </div>

      <div className="space-y-3">
        {trendingTopics.map((item, index) => (
          <motion.div
            key={item.topic}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700/30 hover:bg-gray-700/50 hover:border-purple-500/30 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300">{item.topic}</span>
            </div>
            <span className="text-xs text-green-400 font-semibold">{item.growth}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700/50 flex items-center gap-2 text-xs text-gray-500">
        <Clock className="w-3 h-3" />
        <span>Updated 2 hours ago</span>
      </div>
    </motion.div>
  );
};
